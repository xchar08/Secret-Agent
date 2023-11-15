import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity} from 'react-native'; 
import bluebackground from '../assets/bluebackground.png';


export default function JoinGame({navigation}) {

    const [name, setName] = useState('');
    const [JoinGameID, setID] = useState('');
    

      // Determine if the button should be disabled
      const isButtonDisabled = name.trim() === '' || JoinGameID.trim() === '';

      const handleJoinButtonPress = () => {
        if (!isButtonDisabled) {
          alert("Joining Game");

        } else {
            alert("Name and GameID required");
        }
      };

return (
    <View style={styles.container}>
        <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
        <Text style={styles.text}>Join Game</Text>

        <TextInput 
        style={styles.input}
        placeholder="Enter Name" 
        placeholderTextColor="darkblue"
        onChangeText={text => setName(text)}
        value={name}
        />

        <TextInput 
        style={styles.input}
        placeholder="Game ID" 
        placeholderTextColor="darkblue"
        onChangeText={text => setID(text)}
        value={JoinGameID}
        />
        
        <TouchableOpacity
          style={[styles.GameLobbyButton, isButtonDisabled ? styles.disabledButton : null]}
          onPress={handleJoinButtonPress}
          disabled={isButtonDisabled}
        >
            <Text style={styles.buttonText}>Join</Text>  
        </TouchableOpacity>
        <StatusBar style="auto" />
        </ImageBackground>
    </View>
)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight,
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