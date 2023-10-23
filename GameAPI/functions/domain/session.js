const { getAuth } = require('firebase-admin/auth');
const { db } = require('./db.js');


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
    delete (result.firebase);
    await db.ref(`/user/${userData.uid}`).set(result);


    return userData;

}

async function logout(idToken) {
    let userData = await verifyToken(idToken);

    await db.ref(`/user/${userData.uid}`).remove();
    return true;
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