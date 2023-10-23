const baseURL = "https://us-central1-cse3310-game.cloudfunctions.net/node_security_api";


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


/**
 * Mission New the user creates a lobby for a new mission
 * @param {*} idToken This is the id token issued from firebase authentication after the user signs in with google
 * @param {*} code The user entered code for the mission
 * @returns 
 */
async function missionNew(idToken, code){
    return await postData(`${baseURL}/mission/new`, {code}, idToken);  
}

/**
 * Mission Join the user joins a lobby from a given code
 * @param {*} idToken  This is the id token issued from firebase authentication after the user signs in with google
 * @param {*} code the invite code for the mission to join
 * @returns 
 */
async function missionJoin(idToken, code){
    return await postData(`${baseURL}/mission/${code}/join`, {code}, idToken);
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
        "Authorization": authToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }
  
  postData("https://example.com/answer", { answer: 42 }).then((data) => {
    console.log(data); // JSON data parsed by `data.json()` call
  });
  