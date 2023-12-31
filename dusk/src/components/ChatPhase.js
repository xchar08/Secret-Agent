import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { CodeContext, AuthContext } from '../services/gameState';

export default function ChatPhase({ onEnd }) {
    const { user, setUser } = useContext(AuthContext);
    const { code, setCode } = useContext(CodeContext);

    const handleTimeLimit = () => {
        console.log("Time Limit Advance: ", code, user.idToken);
        onEnd();

        
    }
    return (
        <View>
            
            <View style={styles.backDrop}>
            <Timer style={styles.timer} limit={5} onLimit={handleTimeLimit}></Timer>
                <Text style={styles.text}> Discuss anything during this phase.  The next phase will pick a team that will determine the fate of this round's node.</Text>

                <StatusBar style="auto" />
            </View>

        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
    },
    timerText: {
        fontSize: 36,
        lineHeight: 72,
        fontWeight: 'bold',
        color: "white",
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
        fontSize: 21,
        lineHeight: 42,
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