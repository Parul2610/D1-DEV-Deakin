const express = require("express");
const cors = require("cors");
const formData = require("form-data");
const Mailgun = require("mailgun.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { initializeApp, applicationDefault, getApps } =
  require("firebase-admin/app");
const { getFirestore, Timestamp } =
  require("firebase-admin/firestore");

require("dotenv").config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Environment checks
if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET is missing from your .env file.");
}

// Firebase Admin initialization
const firebaseApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: applicationDefault(),
        projectId: "dev-deakin-1cc7d",
      });

const db = getFirestore(firebaseApp);
const usersCollection = db.collection("users");

// Mailgun setup
const mailgun = new Mailgun(formData);

const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

// Basic health check
app.get("/", (req, res) => {
  res.send("DEV@Deakin backend is running.");
});

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { displayName, email, password } = req.body;

    if (
      typeof displayName !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string" ||
      !displayName.trim() ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Please provide your name, email, and password.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingUsers = await usersCollection
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (!existingUsers.empty) {
      return res.status(409).json({
        message: "An account with this email already exists.",
      });
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = {
      displayName: displayName.trim(),
      email: normalizedEmail,
      passwordHash,
      plan: "Free",
      createdAt: Timestamp.now(),
    };

    const userRef = await usersCollection.add(newUser);

    return res.status(201).json({
      message: "Registration successful!",
      user: {
        id: userRef.id,
        displayName: newUser.displayName,
        email: newUser.email,
        plan: newUser.plan,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      message: "Registration failed. Please try again.",
    });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      typeof email !== "string" ||
      typeof password !== "string" ||
      !email.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Please provide your email and password.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const usersSnapshot = await usersCollection
      .where("email", "==", normalizedEmail)
      .limit(1)
      .get();

    if (usersSnapshot.empty) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const userDoc = usersSnapshot.docs[0];
    const user = userDoc.data();

    // Existing accounts without passwordHash need migration.
    if (!user.passwordHash) {
      return res.status(403).json({
        message:
          "This account needs migration before Express login can be used. Your existing account has not been changed.",
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.passwordHash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      {
        userId: userDoc.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    return res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: userDoc.id,
        displayName: user.displayName || "",
        email: user.email,
        plan: user.plan || "Free",
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Login failed. Please try again.",
    });
  }
});

// VERIFY JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Please log in first.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return res.status(403).json({
        message: "Your session is invalid or expired. Please log in again.",
      });
    }

    req.user = user;
    next();
  });
}

// GET CURRENT USER AND PLAN
app.get("/me", authenticateToken, async (req, res) => {
  try {
    const userDoc = await usersCollection.doc(req.user.userId).get();

    if (!userDoc.exists) {
      return res.status(404).json({
        message: "User account not found.",
      });
    }

    const user = userDoc.data();

    return res.json({
      user: {
        id: userDoc.id,
        displayName: user.displayName || "",
        email: user.email,
        plan: user.plan || "Free",
      },
    });
  } catch (error) {
    console.error("Load user error:", error);

    return res.status(500).json({
      message: "Unable to load your account.",
    });
  }
});

// UPGRADE TO PAID — DEMONSTRATION ONLY
app.post("/upgrade", authenticateToken, async (req, res) => {
  try {
    const userRef = usersCollection.doc(req.user.userId);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({
        message: "User account not found.",
      });
    }

    const user = userDoc.data();

    if (user.plan === "Paid") {
      return res.json({
        message: "You are already on the Paid plan.",
        plan: "Paid",
      });
    }

    await userRef.update({
      plan: "Paid",
      planUpdatedAt: Timestamp.now(),
    });

    return res.json({
      message: "Demonstration upgrade successful!",
      plan: "Paid",
    });
  } catch (error) {
    console.error("Upgrade error:", error);

    return res.status(500).json({
      message: "Unable to update your plan. Please try again.",
    });
  }
});

// SUBSCRIBE — Mailgun newsletter
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;

    if (typeof email !== "string" || !email.trim()) {
      return res.status(400).send("Please provide an email address.");
    }

    if (!process.env.MAILGUN_API_KEY || !process.env.MAILGUN_DOMAIN) {
      return res.status(500).send("Email service is not configured.");
    }

    const response = await mg.messages.create(
      process.env.MAILGUN_DOMAIN,
      {
        from: `DEV@Deakin <mailgun@${process.env.MAILGUN_DOMAIN}>`,
        to: [email.trim()],
        subject: "Welcome to DEV@Deakin",
        text: "Thank you for subscribing to DEV@Deakin!",
      }
    );

    console.log("Newsletter email queued:", response.id);

    return res.status(202).send("Thank you for subscribing!");
  } catch (error) {
    console.error("Mailgun error:", error);

    return res.status(500).send(
      "There was an error sending the email."
    );
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});