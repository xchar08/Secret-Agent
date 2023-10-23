//represents a real time database table for firebase (but is mocked for now)
let gameTable = [

]

const NOTFOUND = -1;
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
function addGame(hostId, gameCode) {
    //check and remove any previous games from the game server
    let hostPrevGame = gameTable.findIndex(x => x.hostId === hostId);

    console.log("The index of the previous game is: ", hostPrevGame);

    //-1 means the game was not found so we don't have to delete if it is not found.
    if (hostPrevGame !== NOTFOUND) {
        delete (gameTable[hostPrevGame]);
        gameTable = gameTable.filter(x => x != null);
    }

    
    //adding a new game session
    let gameState = {
        hostId,
        gameCode,
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
                round_state: PHASE_NOT_STARTED
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

    gameTable.push(gameState);

    return gameState;
}

function joinGame(code, uid) {

    console.log("The code sent over is: ", code);
    console.log("My user id is ", uid);

    let hostGame = gameTable.findIndex(x => x.gameCode === code);

    console.log("The Found game index is", hostGame);

    if (hostGame === NOTFOUND) {
        throw Error("The game could not be found.");
    }

    if (gameTable[hostGame].party.length < 5) {
        let joinIndex = gameTable[hostGame].party.findIndex(x => x === uid)
        if (joinIndex !== NOTFOUND) {
            throw Error("You've already joined this game.");
        }
        gameTable[hostGame].party.push(uid);
        gameTable[hostGame].log.push({
            userId: uid, 
            action: "Joined Game.",
            time: new Date()
        });
        if (gameTable[hostGame].party.length === 5)
        {
            //assign hackers
            hacker1 = Math.floor(Math.random() * 5);
            hacker2 = Math.floor(Math.random() * 5);
            while(hacker2 === hacker1)
            {
                hacker2 = Math.floor(Math.random * 5);
            }
            gameTable[hostGame].hackers.push(gameTable[hostGame].party[hacker1], gameTable[hostGame].party[hacker2]);

            //assign round hosts
            gameTable[hostGame].round[2].round_host = gameTable[hostGame].party[1];
            gameTable[hostGame].round[3].round_host = gameTable[hostGame].party[2];
            gameTable[hostGame].round[4].round_host = gameTable[hostGame].party[3];
            gameTable[hostGame].round[5].round_host = gameTable[hostGame].party[4];
        }
    }
    else {
        throw Exception("This game is full");
    }
    return gameTable[hostGame];

}

//for debugging purposes (could be used to create a list of available games)
function gameData() {
    return gameTable;
}

exports.new = addGame;
exports.debug = gameData;
exports.join = joinGame;