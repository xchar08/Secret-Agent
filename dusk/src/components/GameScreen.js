import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { AuthContext, CodeContext, MissionContext, HostContext, RoleContext } from '../services/gameState';
import { 
  PHASE_NOT_STARTED, PHASE_TALK, PHASE_TEAM_VOTE, PHASE_TEAM_REVOTE, PHASE_NODE_VOTE, PHASE_OUTCOME, PHASE_COMPLETE, 
  NODE_VOTE_N, NODE_VOTE_Y, NODE_STATE_OPEN, NODE_STATE_SECURED, NODE_STATE_HACKED,
  getMission, missionAdvance, missionProposeTeam, missionGetProposedTeam, missionVoteTeam, missionNodeVote } from '../services/api.service';
import ChatPhase from './ChatPhase';
import NotStartedPhase from './NotStartedPhase';
import TeamVotePhase from './TeamVotePhase';
import NodeVotePhase from './NodeVotePhase';
import OutcomePhase from './OutcomePhase';
import CompletePhase from './CompletePhase';
import { firebase as databaseProvider } from '@react-native-firebase/database';

export default function GameLobby({ navigation, route }) {

  const FIREBASE_DATABASE = databaseProvider.database();
  const { user, setUser } = useContext(AuthContext);
  const { code, setCode } = useContext(CodeContext);
  const { host, setHost } = useContext(HostContext);
  const { mission, setMission } = useContext(MissionContext);
  const {role, setRole} = useContext(RoleContext);
  const [phasekey, setPhaseKey] = useState(PHASE_NOT_STARTED);
  const [party, setParty] = useState([]);
  const [round, setRound] = useState(0);
  const [nodes, setNodes] = useState([]);
  const [teamSubmitted, setTeamSubmitted] = useState(false);
  const [proposedTeam, setProposedTeam] = useState([]);
  const [isChosen, setIsChosen] = useState(false);

  useEffect(() => {
    const reference = FIREBASE_DATABASE
      .ref(`/mission/${code}`).on('value', (snapshot) => {
        let missionResult = snapshot.val();

        if (missionResult && missionResult.current_phase != phasekey) {

          getMission(user.idToken, code).then(missionData => {
            setMission(missionData.payload);
            setRound(missionData.payload.round_number ?? 0); //dynamic round count 
            setNodes(missionData.payload.nodes);
            if (mission.hackers && mission.hackers.length > 0) {
              
              setRole(mission.hackers.filter(x => x.id === user.profile.uid).length > 0 ? "Spy": "Agent");
            }
          

            //host change happens during this step
            if (missionData.payload.current_phase === PHASE_NOT_STARTED && missionData.payload.round_number > 0) {
              const currentRound = missionData.payload.rounds[round];
          
              if (currentRound.round_host != -1 && user.profile.uid === currentRound.round_host.id) {
                setHost(true);
              }
              else
              {
                setHost(false);
              }
            }

            if (missionData.payload.current_phase === PHASE_OUTCOME) {
              //reset the game state
              setTeamSubmitted(false);
              setProposedTeam([]);
              setIsChosen(false);
              

 
            }

            //update phase
            if (nodes.filter(node => node.state === NODE_STATE_HACKED).length === 3 && phasekey !== PHASE_COMPLETE)
            {
              setPhaseKey(PHASE_COMPLETE);
            }
            else if (phasekey !== PHASE_COMPLETE)
            {
              setPhaseKey(missionData.payload.current_phase);
            }

            
          });

        }
      });

      const secondReference = FIREBASE_DATABASE
      .ref(`/mission-party/${code}`).on('value', (snapshot) => {
        


        if (snapshot.val() != null && party.length !== 5) {
          
          setParty(Object.values(snapshot.val()));
        
        }
      });
    const thirdReference = FIREBASE_DATABASE
      .ref(`/mission-proposed-team/${code}/${round}`).on('value', (snapshot) => {
       
        if (snapshot.val() != null) {
          missionGetProposedTeam(user.idToken, code, round).then(teamData => {
         
    
            setProposedTeam(teamData.payload);
            setTeamSubmitted(true);
            
            setIsChosen(teamData.payload.filter(pt => pt.id === user.profile.uid).length > 0);
           
          });
        }
        else
        {
         
          setProposedTeam([]);
          setTeamSubmitted(false);
        }

      });


    return () => {
      FIREBASE_DATABASE.ref(`/mission/${code}`).off('value', reference);
      FIREBASE_DATABASE.ref(`/mission-party/${code}`).off('child_added', secondReference);
      FIREBASE_DATABASE.ref(`/mission-proposed-team/${code}/${round}`).off('value', thirdReference);
    }
  }, [mission]);



  const hostHandleStart = () => {
  
    if (host) {
      missionAdvance(user.idToken, code).then((missionResult) => {
     
        if (missionResult.payload != null) {

          setMission(missionResult.payload);
        }
      });
    }
  };

  const handleChatEnd = () => {

    if (host) {
      missionAdvance(user.idToken, code).then((missionResult) => {
        if (missionResult.payload) {
          setMission(missionResult.payload);
        }

     
      });
    }

  };

  const handleSubmitTeam = (team) => {

    missionProposeTeam(user.idToken, code, round, team).then((playersPayload) => {
    
      if (host) {
        missionAdvance(user.idToken, code).then((missionResult) => {
          setMission(missionResult.payload);

        });
      }
    });
  }

  const handleTeamVoteEnd = (vote) => {

    //if the host's timer triggers before users vote
    if (vote === null) {
      if (host) {
        missionAdvance(user.idToken, code).then((missionResult) => {
        
          setMission(missionResult.payload);

        });

        return;
      }
    }

    missionVoteTeam(user.idToken, code, round, vote).then(voteResult => {
      
    });

  }

  const handleNodeVoteEnd = (vote) => {
 
    missionNodeVote(user.idToken, code, round, { ballot: vote }).then(voteResult => {
      
    }).catch(error => console.log('MOO ERROR', error));

  }


  const handleOutcomePhaseEnd = () => {
    if (host)
    {
      missionAdvance(user.idToken, code).then(missionResult => 
        {
          
          setMission(missionResult.payload);
        });
    }
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
            <Text style={styles.headerText}>{`Your Role: ${(role)}`}</Text>
          </View>
        </View>
        <View style={styles.mainBox}>
          {phasekey === PHASE_NOT_STARTED && <NotStartedPhase round={round} onStart={hostHandleStart} partySize={party.length} />}
          {phasekey === PHASE_TALK && <ChatPhase onEnd={handleChatEnd} />}
          {(phasekey === PHASE_TEAM_VOTE || phasekey === PHASE_TEAM_REVOTE) && <TeamVotePhase
            onEnd={handleTeamVoteEnd}
            onSubmitTeam={handleSubmitTeam}
            mission={mission}
            players={party}
            isHost={host}
            teamSubmitted={teamSubmitted}
            onSubmitVote={handleTeamVoteEnd}
            proposedTeam={proposedTeam}

          />
          }


          {phasekey === PHASE_NODE_VOTE && <NodeVotePhase isChosen={isChosen} onSubmitVote={handleNodeVoteEnd} role={role} />}
          {phasekey === PHASE_OUTCOME && <OutcomePhase node={nodes[round - 1]} onEnd={handleOutcomePhaseEnd}/*onEnd needs to be set to handleOutcomePhaseEnd */ />}
          {phasekey === PHASE_COMPLETE && <CompletePhase nodes={nodes} />}
        </View>
        {nodes && <View style={styles.bottomBox}>
          {nodes.map((node, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.circle, { backgroundColor: node.state === NODE_STATE_OPEN ? 'blue' : node.state === NODE_STATE_SECURED ? 'green' : 'red' }]}
            
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