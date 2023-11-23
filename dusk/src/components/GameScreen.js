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


import { firebase } from '@react-native-firebase/database';




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
*/

export default function GameLobby({ navigation, route }) {
  const { game, setGame } = useContext(GameContext);
  const [phasekey, setPhaseKey] = useState(PHASE_NOT_STARTED);
  const [playersJoined, setPlayersJoined] = useState(1);

  useEffect(() => {
    const reference = firebase
    .app()
    .database('https://cse3310-game-default-rtdb.firebaseio.com')
    .ref(`/mission/${game.code}`)
    .on('value', (snapshot) => {
      console.log("meow", snapshot.val());
      if (snapshot.val() != null) 
      {
        setPhaseKey(snapshot.val().current_phase);
      }
      

    });

  const secondReference = firebase.app().database('https://cse3310-game-default-rtdb.firebaseio.com')
  .ref(`/mission-party/${game.code}`).on('value', (snapshot) => {
    console.log("bark", snapshot.val());


    if (snapshot.val() != null) {
      console.log(playersJoined, Object.keys(snapshot.val()).length);
      setPlayersJoined(Object.keys(snapshot.val()).length);
    }
  });

  const thirdReference = firebase
    .app()
    .database('https://cse3310-game-default-rtdb.firebaseio.com')
    .ref(`/mission/${game.code}`)
    .once('value').then(value => {
      console.log("hello", value);
    })

  return () => {
    firebase.app().database('').ref(`/mission/${game.code}`).off('value', reference);
    firebase.app().database('').ref(`/mission-party/${game.code}`).off('child_added', secondReference);
    
  }
  }, [game]);
  


  const hostHandleStart = () => {
    console.log("Handle Start Pressed");
    setPhaseKey(PHASE_TALK);
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_TALK);
      game.mission = mission;
    });
  };



  const handleChatEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_TEAM_VOTE);
      game.mission = mission.payload;
      console.log("chat ended", mission);
    });
  };

  const handleTeamVoteEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_NODE_VOTE);
      game.mission = mission;
    });
  }

  const handleNodeVoteEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setPhaseKey(PHASE_OUTCOME);
      game.mission = mission;
    });
  }



  return (
    <View style={styles.container}>
      <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
        <Text>GameId: {game.code}</Text>
        {phasekey === PHASE_NOT_STARTED && <NotStartedPhase onStart={hostHandleStart} game={game} partySize={playersJoined} />}
        {phasekey === PHASE_TALK && <ChatPhase onEnd={handleChatEnd} />}
        {phasekey === PHASE_TEAM_VOTE && <TeamVotePhase onEnd={handleTeamVoteEnd} />}
        {phasekey === PHASE_TEAM_REVOTE && <TeamVotePhase onEnd={handleTeamVoteEnd} />}
        {phasekey === PHASE_NODE_VOTE && <NodeVotePhase onEnd={handleNodeVoteEnd} />}
        {phasekey === PHASE_OUTCOME && <OutcomePhase />}
        {phasekey === PHASE_COMPLETE && <CompletePhase />}
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  image: {
    height: '100%',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'stretch',
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
    //alignSelf: 'top', doesnt work
  },


})