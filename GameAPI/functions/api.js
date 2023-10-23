const express = require('express');
const bodyParser = require('body-parser');
const session = require('./domain/session.js')
const mission = require('./domain/mission.js');
//const fs = require('fs');

const DEBUG = false;
const NOT_FOUND = -1;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    //let html = fs.readFileSync("./login.html");
    res.sendFile(__dirname + "/login.html");

});

app.post('/session/start', async (req, res) => {

    let idToken = req.headers['authorization'];
    try {
        let loginResult = await session.start(idToken);
        res.send({ "payLoad": loginResult, "error": null });
    }
    catch (e) {
        res.status(401).send({ "payload": null, "error": e.message});
    }


});

app.get('/session/debug', async (req, res) => {
    res.send({ "payload": await session.data(), "error": null });
})

app.post('/session/end', async (req, res) => {
    let idToken = req.headers['authorization'];
    try {
        let logoutResult = await session.end(idToken);
        res.send({ "payload": "Logout Success", "error": null });
    }
    catch (e) {
        res.send({ "payload": null, "error": "Logout Failed.  User Session is still intact. Reason:" + e.message });
    }

});


app.get('/profile/me', async (req, res) => {
    let idToken = req.headers['authorization'];
    res.send('Hello, World');
});


app.get('/profile/:id', async (req, res) => {
    let idToken = req.headers['authorization'];
    res.send('Hello, World');
});

app.post('/mission/new', async (req, res) => {
    let idToken = req.headers['authorization'];
    let code = req.body.code;
    try {
        let hostId = await session.getUid(idToken);
        let gameState = await mission.new(hostId, code);
        res.send({ "payload": gameState, "error": null });
    }
    catch (e) {
        errorHandler(e, res);
    }


});

app.get('/mission/debug', async (req, res) => {
    res.send({payload: await mission.debug(), error: null});
});



app.post('/mission/:id/join', async (req, res) => {
    //res.send('Hello, World');
    let code = req.body.code;
    let idToken = req.headers['authorization'];
    let uid = NOT_FOUND;
    console.log("join request params extracted: ", { code, idToken });
    try {
        uid = await session.getUid(idToken);
    }
    catch (e) {
        res.send({"payload": null, "error": "Invalid Session"});
    }
    try {
        let gameState = await mission.join(code, uid);
        res.send({"payload":gameState, "error": null});
    }
    catch (e) {
        res.status(409).send(
            {"payload": null, "error": e.message}
        );
    }

});

app.post('/mission/:id/round/:roundId/start', async (req, res) => {
    res.send('Hello, World');
});

app.post('/mission/:id/round/:roundId/phase', async (req, res) => {
    res.send('Hello, World');
})

app.post('/mission/:id/phase', async (req, res) => {
    res.send('Hello, World');
});

app.get('/mission/:id/round/:roundId/chat', async (req, res) => {
    res.send('Hello, World');
});

app.post('/mission/:id/round/:roundId/chat', async (req, res) => {
    res.send('Hello, World');
});

app.get('/mission/:id/log', async (req, res) => {
    res.send('Hello, World');
});

if (DEBUG == true)
    app.listen(8080, () => {
        console.log("Server Started.");
    });

exports.missionApi = app;

function errorHandler(e, res) {
    if (e.message.contains("auth")) {
        res.status(401).send({ "payload": null, "error": "Authentication Failed" });
    }
    else {
        res.status(500).send({ "payload": null, "error": e.message });
    }
}
