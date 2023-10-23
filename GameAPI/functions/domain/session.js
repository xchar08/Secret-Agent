const { getAuth } = require('firebase-admin/auth');
const admin = require("firebase-admin");

var serviceAccount = require("../cse3310-game-firebase-adminsdk-wxvpl-58beafe21f.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://cse3310-game-default-rtdb.firebaseio.com"
});


const db = admin.database();
const USER_NOT_FOUND = {};

async function verifyToken(idToken) {
    return await getAuth().verifyIdToken(idToken);
}

async function login(idToken) {
    let userData = await verifyToken(idToken);
    //let result = userTable.findIndex(x => x.id === userData.uid);


    //let result = {...(await db.ref(`/user/${userData.uid}`).once('value')).val()};

    result = { ...userData, session: idToken };
    console.log("Update  Result:", result);
    delete(result.firebase);
    await db.ref(`/user/${userData.uid}`).set(result);


    return userData;

}

async function logout(idToken) {
    await verifyToken(idToken);
    let result = userTable.findIndex(x => x.session === idToken);

    if (result !== -1) {
        userTable[result].session = null;
        return true;
    }
    return false;
}

async function data() {
    return (await db.ref("/user").once('value')).val();
}

async function getHostIdFromSession(idToken) {
    let userData = await verifyToken(idToken);
    return userData.uid;
}

exports.start = login;
exports.end = logout;
exports.data = data;
exports.getUid = getHostIdFromSession;