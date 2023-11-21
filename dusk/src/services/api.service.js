const baseURL = "https://us-central1-cse3310-game.cloudfunctions.net/node_security_api";



const ROUND_HOST_INDEX_OFFSET = 1;
const MISSION_PARTY_NOT_READY = "mission/party_not_ready";
const MIN_HACK_WIN_VOTE = 1;
const PARTY_SIZE = 2;   //change this to 5 later
const MISSION_NOTFOUND = "mission/not_found";

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

/**
 * Session Start
 * @param {*} idToken This is the id token issued from firebase authentication after the user signs in with google
 * @returns will return their session object
 */
async function sessionStart(idToken){
    return await postData(`${baseURL}/session/start`, null, idToken);
}


/**
 * Session End
 * @param {*} idToken This is the id token issued from firebase authentication after the user signs in with google
 * @returns will return their session object
 * @returns Nothing, but the side effect is that the session of the user is removed from the database
 */
async function sessionEnd(idToken){
    return await postData(`${baseURL}/session/end`, null, idToken);
}

async function sessionDebug() {
  return await getData(`${baseURL}/session/debug`, null, null);
}


/**
 * Mission New the user creates a lobby for a new mission
 * @param {*} idToken This is the id token issued from firebase authentication after the user signs in with google
 * @param {*} code The user entered code for the mission
 * @returns The the core mission data
 */
async function missionNew(idToken, code){
    return await postData(`${baseURL}/mission/new`, {code}, idToken);  
}

/**
 * Mission Join the user joins a lobby from a given code
 * @param {*} idToken  This is the id token issued from firebase authentication after the user signs in with google
 * @param {*} code the invite code for the mission to join
 * @returns the current party
 */
async function missionJoin(idToken, code){
    return await postData(`${baseURL}/mission/${code}/join`, {code}, idToken);
}

async function missionDebug() {
  return await getData(`${baseURL}/mission/debug`, null, null);
}

async function missionAdvance(idToken, code) {
  return await postData(`${baseURL}/mission/${code}/round/advance`, null, idToken);
}

async function getData(url = "", authToken = "")
{
  const response = await fetch(url, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Accept": "application/json",
      "authorization": authToken
    },
    redirect: "follow",
    referrerPolicy: "no-referrer"

  });


  return response.json();
}

// Example POST method implementation from Mozilla.com documentation on fetch, seems to be useful:
async function postData(url = "", data = {}, authToken = "") {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        "authorization": authToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: (data != null) ? JSON.stringify(data) : undefined, // body data type must match "Content-Type" header
    });
    // console.log("status: ", response.status);
    let responseData = await response.json();
   // console.log(`Response Data [${url}):`, responseData);
    return responseData; // parses JSON response into native JavaScript objects
  }
  /*
  postData("https://example.com/answer", { answer: 42 }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });*/
  

  exports.sessionStart = sessionStart;
  exports.sessionEnd = sessionEnd;
  exports.sessionDebug = sessionDebug;
  exports.missionNew = missionNew;
  exports.missionJoin = missionJoin;
  exports.missionDebug = missionDebug;
  exports.missionAdvance = missionAdvance;

  exports.PHASE_NOT_STARTED = PHASE_NOT_STARTED;
  exports.PHASE_TALK = PHASE_TALK;
  exports.PHASE_TEAM_VOTE = PHASE_TEAM_VOTE
  exports.PHASE_TEAM_REVOTE = PHASE_TEAM_REVOTE
  exports.PHASE_NODE_VOTE = PHASE_NODE_VOTE
  exports.PHASE_OUTCOME = PHASE_OUTCOME
  exports.PHASE_COMPLETE = PHASE_COMPLETE