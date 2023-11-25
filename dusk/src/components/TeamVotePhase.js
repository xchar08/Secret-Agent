import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import Timer from './Timer';
import { GameContext } from '../services/gameState';


export default function TeamVotePhase({round, isHost, players, circleStatus, onSubmitTeam, code}) {
    const { game, setGame } = useContext(GameContext);
    console.log("game:", game);
    const [playersSelected, setPlayersSelected] = useState([]);

    function handlePlayerPress(player) {
        setPlayersSelected([...playersSelected, player]);
    }

    console.log("circleStatus: ", circleStatus);
    console.log("players", players);
    console.log("isHost", isHost);
    console.log("code", code);
    console.log("round", round);

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
                        <Text style={styles.headerText}>{`Your Role: ${(isHost) ? "Host" : "Participant"}`}</Text>
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
                            onPress={() => onSubmitTeam(playersSelected)}
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