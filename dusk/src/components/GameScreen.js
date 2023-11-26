import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { GameContext } from '../services/gameState';
import { PHASE_NOT_STARTED, PHASE_TALK, PHASE_TEAM_VOTE, PHASE_TEAM_REVOTE, PHASE_NODE_VOTE, PHASE_OUTCOME, PHASE_COMPLETE, missionAdvance } from '../services/api.service';
import ChatPhase from './ChatPhase';
import NotStartedPhase from './NotStartedPhase';
import TeamVotePhase from './TeamVotePhase';
import NodeVotePhase from './NodeVotePhase';
import OutcomePhase from './OutcomePhase';
import CompletePhase from './CompletePhase';

import { firebase as databaseProvider } from '@react-native-firebase/database';


//const options = {
//  ...firebaseConfig
//}
/*
const missionApp = await firebase.initializeApp({
  appId: options.appId,
  projectId: options.projectId,
  apiKey: options.apiKey,
  clientId: options.authDomain,
  androidClientId: options.authDomain,
  messagingSenderId: options.messagingSenderId,
  storageBucket: options.storageBucket,
  databaseURL: options.databaseURL

}, "missionApp");

let gameState = {
  idToken: null,
  code: null,
  isHost: null,
  profile: null,
  mission: null
}

*/

export default function GameLobby({ navigation, route }) {

  const FIREBASE_DATABASE = databaseProvider.database();
  const { game, setGame } = useContext(GameContext);


  const [phasekey, setPhaseKey] = useState(PHASE_NOT_STARTED);
  const [playersJoined, setPlayersJoined] = useState(1);
  const { gameID } = route.params;
  const [round, setRound] = useState(game?.mission?.round_number ?? 0); //dynamic round count
  const [code, setCode] = useState(game?.code);
  const [isHost, setIsHost] = useState(game?.isHost);
  const [players, setPlayers] = useState((game && game.mission && game.mission?.party) ? Object.values(game.mission.party) : [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
    { id: 4, name: 'Player 4' },
    { id: 5, name: 'Player 5' },
  ]);


  const [circleStatus, setCirclStatus] = useState(Array(5).fill(false));

  console.log("HOLLER BACK", game.mission, round, code, isHost, players, circleStatus);

  useEffect(() => {
    const reference = FIREBASE_DATABASE
      .ref(`/mission/${game.code}`)
      .on('value', (snapshot) => {
        console.log("meow", snapshot.val());
        if (snapshot.val() != null) {
          setPhaseKey(snapshot.val().current_phase);
          if (snapshot.val().current_phase != phasekey) {
            setGame({...game, mission: snapshot.val()});
          }
        }


      });

    const secondReference = FIREBASE_DATABASE
      .ref(`/mission-party/${game.code}`).on('value', (snapshot) => {
        console.log("bark", snapshot.val());


        if (snapshot.val() != null) {
          console.log(playersJoined, Object.keys(snapshot.val()).length);
          setPlayersJoined(Object.keys(snapshot.val()).length);
        }
      });

 
    return () => {
      FIREBASE_DATABASE.ref(`/mission/${game.code}`).off('value', reference);
      FIREBASE_DATABASE.ref(`/mission-party/${game.code}`).off('child_added', secondReference);

    }
  }, [game]);



  const hostHandleStart = () => {
    console.log("Handle Start Pressed", game);
    setPhaseKey(PHASE_TALK);
    missionAdvance(game.idToken, game.code).then((mission) => {
      console.log("Advancing", mission);
      //setPhaseKey(PHASE_TALK);
      if (mission.payload != null) {
        game.mission = mission.payload;
        setGame(game);
      }
      
      
    });
  };



  const handlePress = (index) => { //replace inside contents of code as needed
    const newCircleStatus = [...circleStatus];
    newCircleStatus[index] = !newCircleStatus[index];
    //setCircleStatus(newCircleStatus);
  }



  const proposedTeam = [
  ]

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerPress = (player) => {
    setSelectedPlayer(player);
    // You can add your multiplayer code here using the selected player's information
  };



  const handleChatEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_TEAM_VOTE);
      game.mission = mission.payload;
      setRound(game.mission?.round_number ?? 0); //dynamic round count
      setCode(game.code);
      setIsHost(game.isHost);
      setPlayers((mission.payload) ? Object.values(mission.payload.party) : [
        { id: 1, name: 'Player 1' },
        { id: 2, name: 'Player 2' },
        { id: 3, name: 'Player 3' },
        { id: 4, name: 'Player 4' },
        { id: 5, name: 'Player 5' },
      ]);
      console.log("chat ended", mission);
    });
  };

  const handleSubmitTeam = (team) => {
    console.log("Handle Submit Team");
    submitTeam(game.idToken, game.code, team);
  }

  const handleTeamVoteEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_NODE_VOTE);
      game.mission = mission.payload;
    });
  }

  const handleNodeVoteEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_OUTCOME);
      game.mission = mission.payload;
    });
  }



  return (
    <View style={styles.container}>
      <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
        <View style={styles.headerBox}>
          <View>
            <Text style={styles.roundText}>{`Round ${round}`}</Text>
          </View>
          <View style={styles.bar}>
            <Text style={styles.headerText}>{`Game ID: ${code}`}</Text>
            <Timer style={styles.timer}></Timer>
            <Text style={styles.headerText}>{`Your Role: ${(isHost) ? "Host" : "Participant"}`}</Text>
          </View>
        </View>
        <View style={styles.mainBox}>
          {phasekey === PHASE_NOT_STARTED && <NotStartedPhase onStart={hostHandleStart} game={game} partySize={playersJoined} />}
          {phasekey === PHASE_TALK && <ChatPhase onEnd={handleChatEnd} />}
          {phasekey === PHASE_TEAM_VOTE && <TeamVotePhase
            onEnd={handleTeamVoteEnd}
            onSubmitTeam={handleSubmitTeam}
            circleStatus={circleStatus}
            round={round}
            players={players}
            isHost={isHost}
            code={code} />
          }

          {phasekey === PHASE_TEAM_REVOTE && <TeamVotePhase onEnd={handleTeamVoteEnd} />}
          {phasekey === PHASE_NODE_VOTE && <NodeVotePhase onEnd={handleNodeVoteEnd} />}
          {phasekey === PHASE_OUTCOME && <OutcomePhase />}
          {phasekey === PHASE_COMPLETE && <CompletePhase />}
        </View>
        {circleStatus && <View style={styles.bottomBox}>
          {circleStatus.map((isGreen, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.circle, { backgroundColor: isGreen ? 'green' : 'red' }]}
              onPress={() => handlePress(index)}
            />
          ))}
        </View>}

      </ImageBackground>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
    //marginTop: StatusBar.currentHeight,
    flexDirection: 'column',
  },
  bar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center', // Center content horizontally
    alignItems: 'center', // Center content vertically
    padding: 10,
  },
  roundText: {
    fontStyle: 'italic',
    fontSize: 30,
    color: 'white',
  },
  headerText: {
    fontStyle: 'italic',
    fontSize: 15,
    color: 'white',
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'stretch',
  },
  headerBox: {
    flex: 1,
    alignItems: 'center',
  },
  mainBox: {
    flex: 3,
    flexDirection: 'vertical',
    backgroundColor: 'white', //Intentionally overwrites the parent container's background color
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 42,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',

    marginLeft: 20,
    marginRight: 20,
  },
  GameLobbyButton: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'darkblue',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timer: {

    marginLeft: 20,
    marginRight: 20,
  },
  GameLobbyButton: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 15,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: 'white',
  },
  buttonText: {
    color: 'darkblue',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  timer: {

  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
  hexagonContainer: {
    flexDirection: 'vertical',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hexagonSlice: {
    width: 200,
    height: 58,
    backgroundColor: '#3248a8',
    margin: 2,
    borderRadius: 100,
    overflow: 'hidden',
    position: 'relative',
  },
  playerName: {
    textAlign: 'center',
    color: 'white',
    margin: 10,
  },
  submitButton: {
    width: 300,
    height: 40,
    backgroundColor: 'white',
    margin: 1,
    borderRadius: 100,
    borderColor: '#3248a8',
    borderWidth: 2,
  },
  blackText: {
    textAlign: 'center',
    color: '#3248a8',
    fontSize: 20,
    margin: 5,
  }

});