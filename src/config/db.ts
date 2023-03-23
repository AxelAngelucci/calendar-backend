import admin from "firebase-admin";

admin.initializeApp({
    credential: admin.credential.cert(require("./key.json"))
})

const db = admin.firestore;

export default db;