const admin = require("firebase-admin");

var serviceAccount = require("../cse3310-game-firebase-adminsdk-wxvpl-58beafe21f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cse3310-game-default-rtdb.firebaseio.com"
});


const db = admin.database();

exports.db = db;
//how we grant admin access to our database