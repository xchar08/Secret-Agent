import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity, FlatList } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import { missionDebug, missionJoin } from '../services/api.service';
import { AuthContext, CodeContext, MissionContext } from '../services/gameState';

export default function JoinGame({ navigation }) {

  const { user, setUser } = useContext(AuthContext);
  const { mission, setMission } = useContext(MissionContext);
  const { code, setCode } = useContext(CodeContext);
  const [sessions, setSessions] = useState([]);
  const [didStart, setDidStart] = useState(false);
  const [sessionLength, setSessionLength] = useState(0);

  
  useEffect((() => {
    async function getSession() {

      const response = (await missionDebug());
     
      setSessions(response.payload);
      setDidStart(true);
      setSessionLength(Object.keys(response.payload).length);

    }

    if (!didStart) {
      getSession();
    }

  }), [])

  handleJoin = (item) => {
    missionJoin(user.idToken, item.code).then(joinMissionResult => {
      if (joinMissionResult.error) {
        console.log("Join Failed.", joinMissionResult.error);
        return;
      }
  

      setCode(item.code);
      setMission(item);

      navigation.navigate("GameScreen");
    });
  }

  _renderItem = ({ item }) => {



    return (
      <>
        {item &&
          <TouchableOpacity onPress={() => handleJoin(item)}>
            <Text style={styles.missionText}>{item.code} ({item && item.party ?  Object.keys(item.party).length : 1} / 5)</Text>
          </TouchableOpacity>
        }
      </>
    )
  };

  return (
    <View style={styles.container}>

      <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Join Game</Text>
        <Text style={styles.missionText}>{sessionLength} total missions online</Text>
        {sessions.length > 0 &&
          <FlatList
            data={sessions?.filter((i) => i != null) ?? []}
            renderItem={_renderItem}
            keyExtractor={item => item.code}
          ></FlatList>
        }
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
  missionText: {
    color: 'white',
    fontSize: 21,
    lineHeight: 42,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  input: {
    borderColor: 'white',
    borderWidth: 2,
    alignItems: 'center',
    textAlign: 'center',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5,
    marginBottom: 10,
    borderRadius: 0,
    color: 'darkblue',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: 'white',
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
  disabledButton: {
    backgroundColor: 'gray',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },

})