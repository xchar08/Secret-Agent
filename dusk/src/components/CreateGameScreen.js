import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';


export default function CreateGame({ navigation }) {

  const [name, setName] = useState('');

  // Function to handle the button press
  const handleSubmit = () => {
    // Do something with the entered name, e.g., submit it
    if (!(name.trim() === '')) {
      alert(`Hello, ${name}!`);
    }
  };

  // Determine if the button should be disabled
  const isButtonDisabled = name.trim() === '';

  const handleCreateGameButtonPress = () => {
    if (!isButtonDisabled) {
      let gameID = makeGameID(4);
      alert(`Game created! GameID: ${gameID} `);
      navigation.navigate('GameScreen', { gameID })
      // Perform your action when the button is pressed and the name is not empty
    } else {
      alert("Name is required");
      // Optionally provide feedback that the name is required
    }
  };

  const makeGameID = (length) => {
    let id = '';
    const characters = '0123456789';
    for (let i = 0; i < length; i++) {
      id += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return id;
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Create Game</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter Name"
          placeholderTextColor="darkblue"
          onChangeText={text => setName(text)}
          value={name}
          onSubmitEditing={handleSubmit}
        />

        <TouchableOpacity
          style={[styles.GameLobbyButton, isButtonDisabled && styles.disabledButton]}
          onPress={handleCreateGameButtonPress}
          disabled={isButtonDisabled}
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