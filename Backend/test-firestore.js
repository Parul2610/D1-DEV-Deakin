const { initializeApp, applicationDefault } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

async function testFirestore() {
  try {
    const app = initializeApp({
      credential: applicationDefault(),
      projectId: "dev-deakin-1cc7d",
    });

    const db = getFirestore(app);
    const snapshot = await db.collection("users").get();

    console.log("Firestore connection successful!");
    console.log("Number of user documents:", snapshot.size);

    snapshot.forEach((doc) => {
      console.log("User document ID:", doc.id);
    });
  } catch (error) {
    console.error("Firestore connection failed:", error.message);
  }
}

testFirestore();