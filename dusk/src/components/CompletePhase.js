import React, {useState, useContext} from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity} from 'react-native'; 
import Timer from './Timer';
import { NODE_STATE_SECURED } from '../services/api.service';


export default function CompletePhase({  nodes}) {
 
return (
    <View style={styles.container}>
        <View style={styles.backDrop}>
            <Text style={styles.text}>GAME OVER</Text>
            {(nodes.filter(node => node.state === NODE_STATE_SECURED).length >= 3) && <Text style={styles.text}>The Mission is Successful, Agents Win!</Text> }
            {(nodes.filter(node => node.state === NODE_STATE_SECURED).length < 3) && <Text style={styles.text}>The Mission failed, Spies Win!</Text> }
            
            </View>    
    </View>
)

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:StatusBar.currentHeight,
    },
    backDrop: {
      borderColor: 'white',
      borderWidth: 0,
      borderRadius: 35,
      backgroundColor: '#000000c0',
      backgroundOpacity: 0.5,
      backdropFilter: 'blur(80px)',
      padding: 5,
      margin: 10,
      paddingBottom: 60,
      alignItems: 'center'
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