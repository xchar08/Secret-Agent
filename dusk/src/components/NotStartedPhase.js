import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { GameContext } from '../services/gameState';


export default function NotStartedPhase({ onStart, game }) {

    const [isHost, setIsHost] = useState(game.isHost);
    console.log(game.mission);
    const [participantCount, setParticipantCount] = useState(/*Object.keys(game.mission.party).length*/ 1);

    return (
        <View style={styles.container}>
            <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
                <View style={styles.backDrop}>
                    <Text style={styles.text}>Welcome to Purgatory</Text>
                    <Text style={styles.text}> ({participantCount} / 5)</Text>
                    {
                        isHost && 
                        <TouchableOpacity onPress={onStart} style={styles.button}>
                            <Text style={styles.text}>Start Game</Text>
                        </TouchableOpacity>
                    }
                    {
                        !isHost && <Text style={styles.text}>Waiting on host start.</Text>
                    }
                </View>
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
    button: {
        alignItems: 'center',
        backgroundColor: '#000000c0',
        borderRadius: 10,
        borderColor: 'white',
        borderWidth: 2,
        padding: 10,
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