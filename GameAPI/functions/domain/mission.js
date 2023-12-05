const uuid = require('uuid');
const { db } = require('./db.js');
//const { missionAdvance } = require('../../../dusk/src/services/api.service.js');

const ROUND_HOST_INDEX_OFFSET = 1;
const MISSION_PARTY_NOT_READY = "mission/party_not_ready";
const MIN_HACK_WIN_VOTE = 1;
const PARTY_SIZE = 2;   //change this to 5 later
const MISSION_NOTFOUND = "mission/not_found";
const MISSION_INVALID_TEAM_PROPOSAL_LENGTH = "mission/invalid_team_proposal_length";

const NOTFOUND = null;
const PARTY_INDEX_NOT_FOUND = -1;


//initial/start phase of a round
const PHASE_NOT_STARTED = "Round Not Started";

//phases of a round
const PHASE_TALK = "Phase Talk";
const PHASE_TEAM_VOTE = "Phase Team Vote";
const PHASE_TEAM_REVOTE = "Phase Team ReVote";
const PHASE_NODE_VOTE = "Phase Node Vote";
const PHASE_OUTCOME = "Phase Outcome";

//final phase
const PHASE_COMPLETE = "Phase Complete";

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

//module of functions that coordinate a game session

async function addGame(hostId, code) {

    //adding a new game session
    //game state is here for a visualization
    const gameState = {
        hostId,
        code,
        party: [hostId],
        hackers: [],
        nodes: {
            1: {
                label: NODE_1,
                state: NODE_STATE_OPEN//hack, secure, open
            },
            2: {
                label: NODE_2,
                state: NODE_STATE_OPEN
            },
            3: {
                label: NODE_3,
                state: NODE_STATE_OPEN
            },
            4: {
                label: NODE_4,
                state: NODE_STATE_OPEN
            },
            5: {
                label: NODE_5,
                state: NODE_STATE_OPEN
            }
        },
        rounds: [
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
    let user = (await db.ref(`/user/${hostId}`).once('value')).val();
    let hostUser = {
        id: hostId,
        name: user.name,
        photoURL: user.photoURL ?? user.picture
    };
    let mission = { ...gameState.mission_state, rounds: gameState.rounds, nodes: gameState.nodes, hostId, code, party: [hostUser], hackers:[] };
    await db.ref(`/mission/${code}`).set(mission);

    await db.ref(`/mission-party/${code}`).push(hostUser);

    //await db.ref(`/mission-hackers/${code}`).set([]);
    await db.ref(`/mission-nodes/${code}/1`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-nodes/${code}/2`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-nodes/${code}/3`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-nodes/${code}/4`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-nodes/${code}/5`).set({ state: NODE_STATE_OPEN });
    await db.ref(`/mission-rounds/${code}/1`).set({ round_host: hostUser, outcome: NODE_STATE_OPEN });
    await db.ref(`/mission-rounds/${code}/2`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN });
    await db.ref(`/mission-rounds/${code}/3`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN });
    await db.ref(`/mission-rounds/${code}/4`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN });
    await db.ref(`/mission-rounds/${code}/5`).set({ round_host: NOT_SET, outcome: NODE_STATE_OPEN });

    
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

const MISSION_PARTY_FULL = "mission/party_full";
async function joinGame(code, uid) {

    //get the game by cocde
    let hostGame = (await db.ref(`/mission/${code}`).once('value')).val();


    if (hostGame === NOTFOUND) {
        throw Error(MISSION_NOTFOUND);
    }

   // console.log("Host Game", hostGame);

    //check how may players are in the party by retrieving the party
    let currentParty = Object.values((await db.ref(`/mission-party/${code}`).once('value')).val());

  //  console.log("Players Joined: ", Object.values(currentParty).length);



    //you can join if there's less than 5 players
    if (currentParty.length === 5) {

        throw Error(MISSION_PARTY_FULL);
    }

    //find out if you've already joined this game
    let joinIndex = currentParty.findIndex(x => x === uid);
    if (joinIndex !== PARTY_INDEX_NOT_FOUND) {
        throw Error("You've already joined this game.");
    }


    let user = (await db.ref(`/user/${uid}`).once('value')).val();

    //join the party if you've not already joined

    let currUser = {
        id: uid,
        name: user.name,
        photoURL: user.photoURL ?? user.picture
    };

    await db.ref(`/mission-party/${code}`).push(currUser);

    //update the log
    await db.ref(`/mission-log/${code}`).push({
        userId: uid,
        action: "Joined Game.",
        time: new Date()
    });



    //debug check
  //  console.log(Object.values(((await db.ref(`/mission-party/${code}`).once('value')).val())));

    //retrieve the current party's latest values
    currentParty = Object.values((await db.ref(`/mission-party/${code}`).once('value')).val());


    //do we meet full lobby conditions?
    if (currentParty.length === 5) {
        //assign hackers
        hacker1 = Math.floor(Math.random() * 5);
        hacker2 = Math.floor(Math.random() * 5);
        while (hacker2 === hacker1) {
            hacker2 = Math.floor(Math.random * 5);
        }

        await db.ref(`/mission-hackers/${code}`).push(currentParty[hacker1]);
        await db.ref(`/mission-hackers/${code}`).push(currentParty[hacker2]);

    }

    return currentParty;
}

//for debugging purposes (could be used to create a list of available games)
async function gameData() {

    let missionsCodes = (await db.ref(`/mission`).once('value')).val();
    //console.log(missionsCodes);
    //console.log(Object.keys(missionsCodes));
    let enriched = [];
    let code = "";
    for (var i = 0; i < Object.keys(missionsCodes).length; i++) {
      //  console.log("code:", Object.keys(missionsCodes)[i]);
        //let mission = (await db.ref(`/mission/${code}`).once('value')).val();

        let code = Object.keys(missionsCodes)[i];
        let mission = missionsCodes[code];
        let missionEnriched = {
            ...mission,
            party: (await db.ref(`/mission-party/${code}`).once('value')).val(),
            nodes: (await db.ref(`/mission-nodes/${code}`).once('value')).val(),
            rounds: (await db.ref(`/mission-rounds/${code}`).once('value')).val(),
            hackers: (await db.ref(`/mission-hackers/${code}`).once('value')).val(),
        }
        enriched.push(missionEnriched);
    }


    return enriched;
}

async function get(hostId, code) {

    let mission = (await db.ref(`/mission/${code}`).once('value')).val();


    let missionEnriched = {
        ...mission,
        party: Object.values((await db.ref(`/mission-party/${code}`).once('value')).val()),
        nodes: Object.values((await db.ref(`/mission-nodes/${code}`).once('value')).val()),
        rounds: Object.values((await db.ref(`/mission-rounds/${code}`).once('value')).val()),
        hackers: Object.values((await db.ref(`/mission-hackers/${code}`).once('value')).val()),
    }
    return missionEnriched

}



async function advanceRound(hostId, code) {
    let mission = { ...((await db.ref(`/mission/${code}`).once('value')).val()) };

    if (mission === NOTFOUND) {
        throw Error(MISSION_NOTFOUND);
    }

    const missionPartyObject = (await db.ref(`/mission-party/${code}`).once('value')).val();
    console.log("advancing code", code);
    if (missionPartyObject) {
        currentParty = Object.values(missionPartyObject);
        //console.log(currentParty);
    }
    else {
        currentParty = [];
    }
    if (currentParty.length < PARTY_SIZE) {
        throw Error(MISSION_PARTY_NOT_READY);
    }

    switch (mission.current_phase) {
        case PHASE_NOT_STARTED:
            {
                /**
                 * 
                 */
                mission.round_number++;
                mission.current_phase = PHASE_TALK;

                let round = (await db.ref(`/mission-rounds/${code}/${mission.round_number}`).once('value')).val();
                
                mission.round_host = currentParty[mission.round_number - ROUND_HOST_INDEX_OFFSET];
                await db.ref(`/mission/${code}`).set({ ...mission, current_phase: PHASE_TALK });
            }
            break;
        case PHASE_TALK:
            {
                mission.current_phase = PHASE_TEAM_VOTE;
                await db.ref(`/mission/${code}`).set({ ...mission, current_phase: PHASE_TEAM_VOTE });
            }
            break;
        case PHASE_TEAM_REVOTE:
        case PHASE_TEAM_VOTE:
            {
                //let votes = Object.values((await db.ref(`/mission/${code}/mission-rounds-proposed-team/${mission.round}`).once('value')).val());

                /*if (votes === null || votes.filter(v => v.ballot === NODE_VOTE_Y).length() < 3) {
                    //nays have it
                    mission.current_phase = PHASE_TEAM_REVOTE;
                }
               { else*/
                //console.log('hoot', code, mission);
                mission.current_phase = PHASE_NODE_VOTE;
                //}
                await db.ref(`/mission/${code}`).set({ ...mission });

            }
            break;
        case PHASE_NODE_VOTE:
            {

                let key = `/mission/${code}/mission-rounds-node-vote/${mission.round_number}`;
                console.log("Key: ", key);
                let votes = (await db.ref(key).once('value')).val();
                console.log('VOTES', votes);
                if (votes === null) {
                    console.log("Votes were null");
                    break;
                }
                else {
                    console.log("Vote shape: ", votes);
                    //normalize the shape
                    votes = Object.values(votes);
                }
                //let defaultSecureVotes = 5 - votes.length;
                //nays have it
                let node = (await (db.ref(`/mission-nodes/${code}/${mission.round_number}`).once('value'))).val();
                if ((votes.filter(v => v.ballot === NODE_VOTE_N).length >= MIN_HACK_WIN_VOTE)) {
                    await db.ref(`/mission-nodes/${code}/${mission.round_number}`).set({ ...node, state: NODE_STATE_HACKED });
                }
                else {
                    await db.ref(`/mission-nodes/${code}/${mission.round_number}`).set({ ...node, state: NODE_STATE_SECURED });

                }
                mission.current_phase = PHASE_OUTCOME;
                await db.ref(`/mission/${code}`).set({ ...mission });
            }
            break;
        case PHASE_OUTCOME:
            {
                if (mission.round_number < 5) {
                    const round = (await db.ref(`/mission-rounds/${code}/${mission.round_number + ROUND_HOST_INDEX_OFFSET}`).once('value')).val();
                    await db.ref(`/mission-rounds/${code}/${mission.round_number + ROUND_HOST_INDEX_OFFSET}`).set({ ...round, round_host: currentParty[mission.round_number] });



                    mission.current_phase = PHASE_NOT_STARTED;
                }
                else {
                    mission.current_phase = PHASE_COMPLETE;
                }
                await db.ref(`/mission/${code}`).set({ ...mission });
            }
            break;
        default:
            break;
    }

    //console.log(mission);
    return await get(hostId, code);



}

async function sendChat(code, uid, message) {
    //update the log
    await db.ref(`/mission-log/${code}`).push({
        userId: uid,
        action: "Joined Game.",
        time: new Date()
    });
}


async function getChat(code) {

}


async function voteTeam(uid, code, round, vote) {

    await db.ref(`/mission/${code}/mission-rounds-proposed-team/${round}`).push({ ballot: vote });
    //update the log
    await db.ref(`/mission-log/${code}`).push({
        userId: uid,
        action: "Voted Proposed Team.",
        time: new Date()
    });

    return vote;
}



async function getTeamVote(code) {
    let votes = Object.values((await db.ref(`/mission/${code}/mission-rounds-proposed-team/${round}`).once('value')).val());
    return votes;
}



async function voteNode(uid, code, round, vote) {

    console.log("Node vote params: ", code, uid, round, vote);
    //update the log
    await db.ref(`/mission/${code}/mission-rounds-node-vote/${round}`).push(vote);
    //update the log
    await db.ref(`/mission-log/${code}`).push({
        userId: uid,
        action: "Voted Proposed Team.",
        time: new Date()
    });
    let votes = Object.values((await db.ref(`/mission/${code}/mission-rounds-node-vote/${round}`).once('value')).val());
    if ((votes.length === 3) || (votes.filter(v => v.ballot === NODE_VOTE_N).length > 0)) {
        console.log("Trigger round advance due to max votes or lethal vote", votes);
        advanceRound(null, code);
        return vote;
    }

    return vote;
}

async function getNodeVote(code, round) {
    let votes = Object.values((await db.ref(`/mission/${code}/mission-rounds-node-vote/${round}`).once('value')).val());








    return votes;
}
async function proposeTeam(uid, code, round, players) {
    if (players.length != 3) {
        throw new Error(MISSION_INVALID_TEAM_PROPOSAL_LENGTH);
    }

    await db.ref(`/mission-proposed-team/${code}/${round}`).set({ players });
    await db.ref(`/mission-rounds/${code}/${round}/is_proposed`).set(true);

    await db.ref(`/mission-log/${code}`).push({
        userId: uid,
        action: "Proposed Team.",
        time: new Date()
    });

    return players;
}
async function getProposedTeam(uid, code, round) {
    return Object.values((await db.ref(`/mission-proposed-team/${code}/${round}`).once('value')).val())[0];

}
exports.new = addGame;
exports.debug = gameData;
exports.join = joinGame;
exports.get = get;
exports.advanceRound = advanceRound;
exports.sendChat = sendChat;
exports.getChat = getChat;
exports.voteTeam = voteTeam;
exports.getTeamVote = getTeamVote;
exports.voteNode = voteNode;
exports.getNodeVote = getNodeVote;
exports.proposeTeam = proposeTeam;
exports.getProposedTeam = getProposedTeam;