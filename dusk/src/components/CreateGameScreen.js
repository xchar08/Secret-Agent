import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import {missionNew} from '../services/api.service';

import {AuthContext, CodeContext, MissionContext} from '../services/gameState';


const makeGameID = (length) => {
  let id = '';
  const characters = '0123456789';
  for (let i = 0; i < length; i++) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

export default function CreateGame({ navigation }) {
  const {user, setUser} = useContext(AuthContext);
  const {code, setCode} = useContext(CodeContext);
  const {mission, setMission} = useContext(MissionContext);
  
  const [tempCode, setTempCode] = useState(makeGameID(4));
 
 // const [code, setCode] = useState();

  const handleCreateGameButtonPress = () => {

    missionNew(user.idToken, tempCode).then(missionResult => {
      if (missionResult.error) {
        console.log(missionResult.error);
        return;
      }
      console.log('missionResult', missionResult.payload);
      setCode(tempCode);
      setMission(missionResult.payload);
      navigation.navigate('GameScreen');
    });
    

  };

  //console.log("game", game);
  return (
    <View style={styles.container}>
      <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Create Game</Text>

        <Text style={styles.text}>Game Join Id: {tempCode}</Text>
        <TouchableOpacity
          style={[styles.GameLobbyButton]}
          onPress={handleCreateGameButtonPress}
        
        >
          <Text style={styles.buttonText}>Create Game</Text>
        </TouchableOpacity>
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
  gameText: {
    color: 'white',
    fontSize: 21,
    lineHeight: 42,
    fontWeight: 'bold',
    textAlign: 'center',

    marginLeft: 20,
    marginRight: 20,
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


})