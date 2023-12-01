import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { AuthContext, CodeContext, HostContext} from '../services/gameState';


export default function OutcomePhase({onEnd}) {
    const { user, setUser } = useContext(AuthContext);
    const { code, setCode } = useContext(CodeContext);
    const { host, setHost } = useContext(HostContext);

    const handleTimeLimit = () => {
        console.log("Time Limit Advance: ", code, user.idToken);
        onEnd();

        
    }
    
    return (
        <View style={styles.container}>
            <ImageBackground source={bluebackground} resizeMode="cover" style={styles.image}>
                <Text>Here Are the Results of This Round</Text>
                <Timer style={styles.timer}></Timer>
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