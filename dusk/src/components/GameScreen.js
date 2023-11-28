import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { GameContext } from '../services/gameState';
import { PHASE_NOT_STARTED, PHASE_TALK, PHASE_TEAM_VOTE, PHASE_TEAM_REVOTE, PHASE_NODE_VOTE, PHASE_OUTCOME, PHASE_COMPLETE, getMission, missionAdvance, missionProposeTeam, missionGetProposedTeam } from '../services/api.service';
import ChatPhase from './ChatPhase';
import NotStartedPhase from './NotStartedPhase';
import TeamVotePhase from './TeamVotePhase';
import NodeVotePhase from './NodeVotePhase';
import OutcomePhase from './OutcomePhase';
import CompletePhase from './CompletePhase';

import { firebase as databaseProvider } from '@react-native-firebase/database';


export default function GameLobby({ navigation, route }) {

  const FIREBASE_DATABASE = databaseProvider.database();
  const { game, setGame } = useContext(GameContext);
  const [mission, setMission] = useState(game.mission);
  const [phasekey, setPhaseKey] = useState(PHASE_NOT_STARTED);
  const [party, setParty] = useState([]);
  const [round, setRound] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [teamSubmitted, setTeamSubmitted] = useState(false);
  const [proposedTeam, setProposedTeam] = useState([]);
  const code = mission.code;
  const isHost = game.isHost;
  //create a new state that is called teamSubmitted and set it's initial value to false.  useState(false) pattern here
  //create a new state that is called proposedTeam and set it's initial value to [], useState([]) pattern here

  console.log("HOLLER BACK", mission, code, isHost, game);

  useEffect(() => {
    const reference = FIREBASE_DATABASE
      .ref(`/mission/${game.code}`).on('value', (snapshot) => {
        let mission = snapshot.val();
        console.log("meow", mission);
        if (mission && mission.current_phase != phasekey) {

            getMission(game.idToken, game.code).then(missionData => {
            setMission(missionData.payload);
            setPhaseKey(missionData.payload.current_phase);
            setRound(missionData.payload.round_number ?? 0); //dynamic round count 
            setNodes(missionData.payload.nodes);
          });

        }
      });

    const secondReference = FIREBASE_DATABASE
      .ref(`/mission-party/${game.code}`).on('value', (snapshot) => {
        console.log("bark", snapshot.val());


        if (snapshot.val() != null) {
          setParty(Object.values(snapshot.val()));
          /*setPlayers((mission.payload) ? Object.values(mission.payload.party) : [
            { id: 1, name: 'Player 1' },
            { id: 2, name: 'Player 2' },
            { id: 3, name: 'Player 3' },
            { id: 4, name: 'Player 4' },
            { id: 5, name: 'Player 5' },
          ]);*/
        }
      });
      const thirdReference = FIREBASE_DATABASE
      .ref(`/mission-proposed-team/${code}/${round}`).on('value', (snapshot) => {
        console.log('howl', snapshot.val());
        missionGetProposedTeam(game.idToken,code,round).then(teamData =>{
          console.log('chirp', teamData.payload);
          setProposedTeam(teamData.payload);
          setTeamSubmitted(snapshot.val());
          
        });
          
        
      });
      


    return () => {
      FIREBASE_DATABASE.ref(`/mission/${game.code}`).off('value', reference);
      FIREBASE_DATABASE.ref(`/mission-party/${game.code}`).off('child_added', secondReference);
      FIREBASE_DATABASE.ref(`/mission-proposed-team/${code}/${round}`).off('value', thirdReference);
    }
  }, [game, mission]);



  const hostHandleStart = () => {
    console.log("Handle Start Pressed", game);
    setPhaseKey(PHASE_TALK);
    missionAdvance(game.idToken, game.code).then((mission) => {
      console.log("Advancing", mission);
      //setPhaseKey(PHASE_TALK);
      if (mission.payload != null) {

        setMission(mission.payload);
      }


    });
  };



  const handlePress = (index) => { //replace inside contents of code as needed
    const newnodes = [...nodes];
    newnodes[index] = !newnodes[index];
    //setnodes(newnodes);
  }

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerPress = (player) => {
    setSelectedPlayer(player);
    // You can add your multiplayer code here using the selected player's information
  };




  const handleChatEnd = () => {
    missionAdvance(game.idToken, game.code).then((mission) => {
      setMission(mission.payload);



      console.log("chat ended", mission);
    });
  };

  const handleSubmitTeam = (team) => {
    console.log("Handle Submit Team");
    missionProposeTeam(game.idToken, game.code, round, team).then((playersPayload) => {
      console.log('ribbit', playersPayload);
      

    });
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
          {phasekey === PHASE_NOT_STARTED && <NotStartedPhase onStart={hostHandleStart} game={game} partySize={party.length} />}
          {phasekey === PHASE_TALK && <ChatPhase onEnd={handleChatEnd} />}
          {(phasekey === PHASE_TEAM_VOTE || phasekey === PHASE_TEAM_REVOTE) && <TeamVotePhase
            onEnd={handleTeamVoteEnd}
            onSubmitTeam={handleSubmitTeam}
            mission={mission}
            players={party}
            isHost={isHost} 
            teamSubmitted={teamSubmitted}
            onSubmitVote={handleTeamVoteEnd}
            proposedTeam={proposedTeam}
            
            />
          }

         
          {phasekey === PHASE_NODE_VOTE && <NodeVotePhase onEnd={handleNodeVoteEnd} />}
          {phasekey === PHASE_OUTCOME && <OutcomePhase />}
          {phasekey === PHASE_COMPLETE && <CompletePhase />}
        </View>
        {nodes && <View style={styles.bottomBox}>
          {nodes.map((isGreen, index) => (
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