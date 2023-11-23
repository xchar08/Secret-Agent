import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';


export default function GameLobby({ navigation, route }) {
  const { gameID } = route.params;
  const [round, setRound] = useState(2); //dynamic round count
  const [role, setRole] = useState('Agent'); //assign roles

  const [circleStatus, setCircleStatus] = useState(Array(5).fill(false));

  const handlePress = (index) => { //replace inside contents of code as needed
    const newCircleStatus = [...circleStatus];
    newCircleStatus[index] = !newCircleStatus[index];
    setCircleStatus(newCircleStatus);
  }

  const players = [
    { id: 1, name: 'Player 1' },
    { id: 2, name: 'Player 2' },
    { id: 3, name: 'Player 3' },
    { id: 4, name: 'Player 4' },
    { id: 5, name: 'Player 5' },
  ];

  const proposedTeam = [
  ]

  const [selectedPlayer, setSelectedPlayer] = useState(null);

  const handlePlayerPress = (player) => {
    setSelectedPlayer(player);
    // You can add your multiplayer code here using the selected player's information
  };



  return (
    /*
      Screen is broken into 3 containers 
      headerBox (blue background)
      bodyBox (white background)
      bottomBox (blue background)
    */
    <View style={styles.container}>
      <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>

        <View style={styles.headerBox}>
          <View>
            <Text style={styles.roundText}>{`Round ${round}`}</Text>
          </View>
          <View style={styles.bar}>
            <Text style={styles.headerText}>{`Game ID: ${gameID}`}</Text>
            <Timer style={styles.timer}></Timer>
            <Text style={styles.headerText}>{`Your Role: ${role}`}</Text>
          </View>
        </View>

        <View style={styles.mainBox}>
          <View style={styles.hexagonContainer}>
            {players.map((player) => (
              <TouchableOpacity
                key={player.id}
                style={styles.hexagonSlice}
                onPress={() => handlePlayerPress(player)}
              >
                <Text style={styles.playerName}>{player.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <View>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => console.log("hello")}
            >
              <Text style={styles.blackText}>Submit Team Proposal</Text>
            </TouchableOpacity>
          </View>
        </View>


        <View style={styles.bottomBox}>
          {circleStatus.map((isGreen, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.circle, { backgroundColor: isGreen ? 'green' : 'red' }]}
              onPress={() => handlePress(index)}
            />
          ))}
        </View>
        <StatusBar style="auto" />
      </ImageBackground>
    </View>

  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

})