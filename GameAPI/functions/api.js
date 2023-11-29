const express = require('express');
const bodyParser = require('body-parser');
const session = require('./domain/session.js')
const mission = require('./domain/mission.js');


const DEBUG = false;
const NOT_FOUND = -1;

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    //send a test authentication page to generate tokens 
    res.sendFile(__dirname + "/login.html");

});

app.post('/session/start', async (req, res) => {
    //get headers
    let idToken = req.headers['authorization'];
    try {
        let startResult = await session.start(idToken);
        res.send({ "payLoad": startResult, "error": null });
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
        let endResult = await session.end(idToken);
        res.send({ "payload": "Logout Success", "error": null });
    }
    catch (e) {
        res.send({ "payload": null, "error": "session/end-failed"});
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

app.get('/mission/:code', async (req, res) => {
    let idToken = req.headers['authorization'];
    const code = req.params.code;
    try {
        let hostId = await session.getUid(idToken);
        res.send({payload: await mission.get(hostId, code)});
    }
    catch(e)
    {
        errorHandler(e, res);
    }
    
})


app.post('/mission/:code/join', async (req, res) => {
    //res.send('Hello, World');
    let code = req.params.code;
    let idToken = req.headers['authorization'];
    let uid = NOT_FOUND;
    console.log("join request params extracted: ", { code, idToken });
    try {
        uid = await session.getUid(idToken);
    }
    catch (e) {
        res.send({"payload": null, "error": "session/bad-id-token"});
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

app.post('/mission/:code/round/advance', async (req, res) => {
    const code = req.params.code;
    let idToken = req.headers['authorization'];
    let uid = NOT_FOUND;
    console.log("advance request params extracted: ", { code, idToken });
    try {
        uid = await session.getUid(idToken);
    }
    catch (e) {
        res.send({"payload": null, "error": "session/bad-id-token"});
    }
    try {
       let missionState = await mission.advanceRound(uid, code);
       //return the outcome of the phase change
        res.send({"payload": missionState, "error":null});
    }
    catch(e)
    {
        console.log(e.stack);
        res.status(500).send({"payload": null, "error":e.message});
    }
});

app.post('/mission/:code/propose-team/:round', async (req,res) => {
    const code = req.params.code;
    const round = req.params.round;
    let idToken = req.headers['authorization'];
    let uid = NOT_FOUND;
    let players = req.body;
    console.log("[propose team params extracted: ", { code, idToken, round, players });
    try {
        uid = await session.getUid(idToken);
    }
    catch (e) {
        res.send({"payload": null, "error": "session/bad-id-token"});
    }
    try{
        let result = await mission.proposeTeam(uid, code, round, players);
        res.send({"payload": result, "error": null});
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).send({"payload": null, "error":e.message});
    }
})
app.get('/mission/:code/propose-team/:round', async (req,res) => {
    const code = req.params.code;
    const round = req.params.round;
    let idToken = req.headers['authorization'];
    let uid = NOT_FOUND;
    let players = req.body;
    console.log("[propose team params extracted: ", { code, idToken, round, players });
    try {
        uid = await session.getUid(idToken);
    }
    catch (e) {
        res.send({"payload": null, "error": "session/bad-id-token"});
    }
    try{
        let payload = await mission.getProposedTeam(uid, code, round);
        res.status(500).send({"payload": payload, "error": null});
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).send({"payload": null, "error":e.message});
    }
});

/*app.get('/mission/:code/round/chat', async (req, res) => {
    res.send('Hello, World');
});*/

/*app.post('/mission/:code/round/chat', async (req, res) => {
    res.send('Hello, World');
});*/

app.get('/mission/:code/:round/team-vote', async (req, res) => {
    //res.send('Hello, World');
    const code = req.params.code;
    const round = req.params.round;
    let idToken = req.headers['authorization'];
    let uid = NOT_FOUND;
    let players = req.body;
    console.log("[team vote params extracted: ", { code, idToken, round, players });
    try {
        uid = await session.getUid(idToken);
    }
    catch (e) {
        res.send({"payload": null, "error": "session/bad-id-token"});
    }
    try{
        let payload = await mission.getTeamVote(code);
        res.status(500).send({"payload": payload, "error": null});
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).send({"payload": null, "error":e.message});
    }


});

app.post('/mission/:code/:round/team-vote', async (req, res) => {
    const code = req.params.code;
    const round = req.params.round;
    let idToken = req.headers['authorization'];
    let uid = NOT_FOUND;
    let vote = req.body;
    console.log("[vote team params extracted: ", { code, idToken, round, vote });
    try {
        uid = await session.getUid(idToken);
    }
    catch (e) {
        res.send({"payload": null, "error": "session/bad-id-token"});
    }
    try{
        let result = await mission.voteTeam(uid, code, round, vote);
        res.send({"payload": result, "error": null});
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).send({"payload": null, "error":e.message});
    }
});

app.get('/mission/:id/round/node-vote', async (req, res) => {
    res.send('Hello, World');
});

app.post('/mission/:id/round/node-vote', async (req, res) => {
    const code = req.params.code;
    const round = req.params.round;
    let idToken = req.headers['authorization'];
    let uid = NOT_FOUND;
    let vote = req.body;
    console.log("[vote node params extracted: ", { code, idToken, round, vote });
    try {
        uid = await session.getUid(idToken);
    }
    catch (e) {
        res.send({"payload": null, "error": "session/bad-id-token"});
    }
    try{
        let result = await mission.voteNode(uid, code, round, vote);
        res.send({"payload": result, "error": null});
    }
    catch (e) {
        console.log(e.stack);
        res.status(500).send({"payload": null, "error":e.message});
    }
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

    console.log(e.message);
    if (e.message.includes("auth/id-token-expired")) {
        res.status(401).send({ "payload": null, "error": "session/id-token-expired" });
    }
    else {
        res.status(500).send({ "payload": null, "error": e.message });
    }
}
