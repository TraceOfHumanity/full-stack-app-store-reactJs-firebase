const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {user} = require("firebase-functions/v1/auth");

const cors = require("cors")({origin: true});

admin.initializeApp();

const db = admin.firestore();

exports.validateUserJWTToken = functions.https.onRequest(async (req, res) => {
  cors(req, res, async () => {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) {
      return res.status(401).json({error: "Unauthorized"});
    }

    const token = authorizationHeader.split("Bearer ")[1];

    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      if (decodedToken) {
        const docRef = db.collection("users").doc(decodedToken.uid);
        const doc = await docRef.get();
        if (!doc.exists) {
          const userRef = await db.collection("users").doc(decodedToken.uid);
          await userRef.set(decodedToken);
        }

        return res.status(200).json({success: true, user: decodedToken});
      }
    } catch (error) {
      console.error("Error on validating:", error);
      return res
        .status(402)
        .json({error: error.message, status: "un-Authirized"});
    }
  });
});
