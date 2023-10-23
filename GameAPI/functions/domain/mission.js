const uuid = require('uuid');
const { db } = require('./db.js');

//represents a real time database table for firebase (but is mocked for now)
let gameTable = [

]

const MISSION_NOTFOUND = "mission/not_found";

const NOTFOUND = null;
const PARTY_INDEX_NOT_FOUND = -1;
const PHASE_NOT_STARTED = "Round Not Started";
const PHASE_TALK = "Phase Talk";
const PHASE_TEAM_VOTE = "Phase Team Vote";
const PHASE_NODE_VOTE = "Phase Node Vote";
const PHASE_OUTCOME = "Phase Outcome";

const NODE_STATE_OPEN = "open";
const NODE_STATE_HACKED = "hacked";
const NODE_STATE_SECURED = "secured";

const NODE_VOTE_Y = "Y";
const NODE_VOTE_N = "N";

const NODE_1 = 1;
const NODE_2 = 2;
const NODE_3 = 3;
const NODE_4 = 4;
const NODE_5 = 5;


//not started, talk, vote on proposed team, vote on the node, present outcome
const ROUND_ONE = 1;
const ROUND_TWO = 2;
const ROUND_THREE = 3;
const ROUND_FOUR = 4;
const ROUND_FIVE = 5;

const NOT_SET = -1;
async function addGame(hostId, code) {

    //adding a new game session
    //game state is here for a visualization
    const gameState = {
        hostId,
        code,
        party: [hostId],
        hackers: [],
        nodes: [
            {
                label: NODE_1,
                state: NODE_STATE_OPEN//hack, secure, open
            },
            {
                label: NODE_2,
                state: NODE_STATE_OPEN
            },
            {
                label: NODE_3,
                state: NODE_STATE_OPEN
            },
            {
                label: NODE_4,
                state: NODE_STATE_OPEN
            },
            {
                label: NODE_5,
                state: NODE_STATE_OPEN
            }
        ],
        round: [
            {
                round_host: hostId,
                label: ROUND_ONE,
                messages: [],
                proposed_team: [],
                team_votes: [

                ],
                node_vote: [],
                team: [],
                outcome: NODE_STATE_OPEN,//node state,
                rounodeste: PHASE_NOT_STARTED
            },
            {
                round_host: NOT_SET,
                label: ROUND_TWO,
                messages: [],
                proposed_team: [],
                team_votes: [

                ],
                node_vote: [],
                team: [],
                outcome: NODE_STATE_OPEN,//node state,
                round_state: PHASE_NOT_STARTED
            },
            {
                round_host: NOT_SET,
                label: ROUND_THREE,
                messages: [],
                proposed_team: [],
                team_votes: [

                ],
                node_vote: [],
                team: [],
                outcome: NODE_STATE_OPEN,//node state,
                round_state: PHASE_NOT_STARTED
            },
            {
                round_host: NOT_SET,
                label: ROUND_FOUR,
                messages: [],
                proposed_team: [],
                team_votes: [

                ],
                node_vote: [],
                team: [],
                outcome: NODE_STATE_OPEN,//node state,
                round_state: PHASE_NOT_STARTED
            },
            {
                round_host: -1,
                label: ROUND_FIVE,
                messages: [],
                proposed_team: [],
                team_votes: [

                ],
                node_vote: [],
                team: [],
                outcome: NODE_STATE_OPEN,//node state,
                round_state: PHASE_NOT_STARTED
            }
        ],
        mission_state: {
            round_number: 0,
            current_phase: PHASE_NOT_STARTED //not_started; talk; vote; outcome;
        },
        log: [{
            userId: hostId,
            action: "Game created.",
            time: new Date()
        }]
    };

    // gameTable.push(gameState);

    let mission = { ...gameState.mission_state, hostId: gameState.hostId, code: gameState.code };
    await db.ref(`/mission/${code}`).set(mission);
    await db.ref(`/mission-party/${code}`).push(hostId);
    //await db.ref(`/mission-hackers/${code}`).set([]);
    await db.ref(`/mission-nodes/${code}/1`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-nodes/${code}/2`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-nodes/${code}/3`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-nodes/${code}/4`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-nodes/${code}/5`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-rounds/${code}/1`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });
    await db.ref(`/mission-rounds/${code}/2`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });
    await db.ref(`/mission-rounds/${code}/3`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });
    await db.ref(`/mission-rounds/${code}/4`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });
    await db.ref(`/mission-rounds/${code}/5`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });
    //await db.ref(`/mission-rounds-messages/${code}/1`).set([]);
    //await db.ref(`/mission-rounds-messages/${code}/2`).set([]);
    //await db.ref(`/mission-rounds-messages/${code}/3`).set([]);
    //await db.ref(`/mission-rounds-messages/${code}/4`).set([]);
    //await db.ref(`/mission-rounds-messages/${code}/5`).set([]);
    //await db.ref(`/mission-rounds-proposed-team/${code}/1`).set([]);
    //await db.ref(`/mission-rounds-proposed-team/${code}/2`).set([]);
    //await db.ref(`/mission-rounds-proposed-team/${code}/3`).set([]);
    //await db.ref(`/mission-rounds-proposed-team/${code}/4`).set([]);
    //await db.ref(`/mission-rounds-proposed-team/${code}/5`).set([]);
    // await db.ref(`/mission-rounds-team/${code}/1`).set([]);
    // await db.ref(`/mission-rounds-team/${code}/2`).set([]);
    // await db.ref(`/mission-rounds-team/${code}/3`).set([]);
    // await db.ref(`/mission-rounds-team/${code}/4`).set([]);
    // await db.ref(`/mission-rounds-team/${code}/5`).set([]);
    // await db.ref(`/mission-rounds-team-vote/${code}/1`).set([]);
    // await db.ref(`/mission-rounds-team-vote/${code}/2`).set([]);
    // await db.ref(`/mission-rounds-team-vote/${code}/3`).set([]);
    // await db.ref(`/mission-rounds-team-vote/${code}/4`).set([]);
    // await db.ref(`/mission-rounds-team-vote/${code}/5`).set([]);
    await db.ref(`/mission-log/${code}`).push({
        userId: hostId,
        action: "Game created.",
        time: new Date()
    });

    return mission;
}

async function joinGame(code, uid) {


    let hostGame = (await db.ref(`/mission/${code}`).once('value')).val();


    if (hostGame === NOTFOUND) {
        throw Error(MISSION_NOTFOUND);
    }
    console.log("Host Game", hostGame);
    let currentParty = Object.values((await db.ref(`/mission-party/${code}`).once('value')).val());
    console.log("Players Joined: ", Object.values(currentParty).length);
    if (currentParty.length < 5) {
        let joinIndex = currentParty.findIndex(x => x === uid); //hostGame.party.findIndex(x => x === uid)
        if (joinIndex !== PARTY_INDEX_NOT_FOUND) {
            throw Error("You've already joined this game.");
        }
        await db.ref(`/mission-party/${code}`).push(uid);


        await db.ref(`/mission-log/${code}`).push({
            userId: uid,
            action: "Joined Game.",
            time: new Date()
        });
        console.log(Object.values(((await db.ref(`/mission-party/${code}`).once('value')).val())));
        currentParty = Object.values((await db.ref(`/mission-party/${code}`).once('value')).val());
        if (currentParty.length === 5) {
            //assign hackers
            hacker1 = Math.floor(Math.random() * 5);
            hacker2 = Math.floor(Math.random() * 5);
            while (hacker2 === hacker1) {
                hacker2 = Math.floor(Math.random * 5);
            }

            await db.ref(`/mission-hackers/${code}`).push(currentParty[hacker1]);
            await db.ref(`/mission-hackers/${code}`).push(currentParty[hacker2]);

            const round1 = await db.ref(`/mission-rounds/${code}/1`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });
            const round2 = await db.ref(`/mission-rounds/${code}/2`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });
            const round3 = await db.ref(`/mission-rounds/${code}/3`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });
            const round4 = await db.ref(`/mission-rounds/${code}/4`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });
            const round5 = await db.ref(`/mission-rounds/${code}/5`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN, round_state: PHASE_NOT_STARTED });

            await db.ref(`/mission-rounds/${code}/1`).set({ ...round1, round_host: currentParty[0] });
            await db.ref(`/mission-rounds/${code}/2`).set({ ...round2, round_host: currentParty[1] });
            await db.ref(`/mission-rounds/${code}/3`).set({ ...round3, round_host: currentParty[2] });
            await db.ref(`/mission-rounds/${code}/4`).set({ ...round4, round_host: currentParty[3] });
            await db.ref(`/mission-rounds/${code}/5`).set({ ...round5, round_host: currentParty[4] });
        }
    }
    else {
        throw Error("mission/party_full");
    }
    return hostGame;

}

//for debugging purposes (could be used to create a list of available games)
async function gameData() {

    let missionsCodes = (await db.ref(`/mission`).once('value')).val();
    console.log(missionsCodes);
    console.log(Object.keys(missionsCodes));
    let enriched = [];
    let code = "";
    for (var i=0; i< Object.keys(missionsCodes).length; i++) {
        console.log("code:", Object.keys(missionsCodes)[i]);
        //let mission = (await db.ref(`/mission/${code}`).once('value')).val();

        let code = Object.keys(missionsCodes)[i];
        let mission = missionsCodes[code];
        let missionEnriched = {
            ...mission,
            party: (await db.ref(`/mission-party/${code}`).once('value')).val(),
            nodes: (await db.ref(`/mission-nodes/${code}`).once('value')).val(),
            rounds: (await db.ref(`/mission-rounds/${code}`).once('value')).val()
        }
        enriched.push(missionEnriched);
    }


    return enriched;
}

exports.new = addGame;
exports.debug = gameData;
exports.join = joinGame;