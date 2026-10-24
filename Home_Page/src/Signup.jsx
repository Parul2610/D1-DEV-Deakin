
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import {
  doc,
  setDoc,
  serverTimestamp
} from "firebase/firestore";
import { auth, db } from "./Firebase";
import "./Signup.css";

function Signup() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSignup(event) {
    event.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const userCredential =
        await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: displayName
      });

      await setDoc(doc(db, "users", user.uid), {
        displayName: displayName,
        email: email,
        createdAt: serverTimestamp()
      });

      setMessage("Registration successful!");
      setDisplayName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setMessage(error.message);
    }
  }

  return (
    <div className="signup-container">
      <h2>Create an Account</h2>

      <form onSubmit={handleSignup}>
        <label>Display Name</label>
        <input
          type="text"
          value={displayName}
          onChange={(event) =>
            setDisplayName(event.target.value)
          }
          required
        />

        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
          required
        />

        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) =>
            setPassword(event.target.value)
          }
          required
          minLength={6}
        />

        <label>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(event) =>
            setConfirmPassword(event.target.value)
          }
          required
          minLength={6}
        />

        <button type="submit">Sign Up</button>
      </form>

      {message && <p>{message}</p>}
    </div>
  );
}

export default Signup;
