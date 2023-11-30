import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import bluebackground from '../assets/bluebackground.png';
import { AuthContext, HostContext, MissionContext, CodeContext } from '../services/gameState';
import { NODE_VOTE_N, NODE_VOTE_Y } from '../services/api.service';


export default function TeamVotePhase({players, onSubmitTeam, teamSubmitted, proposedTeam, onSubmitVote }) {
    const { user, setUser } = useContext(AuthContext);
    const { code, setCode } = useContext(CodeContext);
    const { host, setHost } = useContext(HostContext);
    const { mission, setMission } = useContext(MissionContext);
    console.log("team vote mission", mission);


    //const selectedPlayers = players.map((player) => ({ ...player, selected: false }));
    const [selectedPlayers, setSelectedPlayers] = useState((players) ? players.map((player) => ({ ...player, selected: false })) : []);
    function handlePlayerPress(player) {

        if ((player.selected) || (!player.selected && selectedPlayers.filter(p => p.selected).length < 3)) {
            player.selected = !player.selected;

            setSelectedPlayers([...selectedPlayers.filter(p => p.id != player.id), player]);
        }
    }

    const handleTimeLimit = () => {
        
        onSubmitVote(null);
    
    }

    console.log("players", players);
    console.log("isHost", host);

    return (

        <View >
            {!host && <View>
                <Text>Please Wait for the Host</Text>
                {teamSubmitted && proposedTeam.map((player) => (

                    <Text key={player.id}
                        style={(player.selected) ? styles.selectedPlayerName : styles.playerName}>{player.name}</Text>

                ))
                }

                {
                    teamSubmitted && <>
                    <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => onSubmitVote(NODE_VOTE_Y)}
                        >
                            <Text style={styles.blackText}>Approve</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => onSubmitVote(NODE_VOTE_N)}
                        >
                            <Text style={styles.blackText}>Reject</Text>
                        </TouchableOpacity>
                    </>
                
                }

            </View>}
            {host &&
                <>
                    <View style={styles.hexagonContainer}>
                        {selectedPlayers.map((player) => (
                            <TouchableOpacity
                                key={player.id}
                                style={(player.selected) ? styles.selectedHexagonSlice : styles.hexagonSlice}
                                onPress={() => handlePlayerPress(player)}
                            >
                                <Text style={(player.selected) ? styles.selectedPlayerName : styles.playerName}>{player.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => onSubmitTeam(selectedPlayers.filter(p => p.selected))}
                        >
                            <Text style={styles.blackText}>Submit Team Proposal</Text>
                        </TouchableOpacity>
                    </View>
                </>}





            <StatusBar style="auto" />

        </View>

    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight,
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
    image: {
        height: '100%',
        width: '100%',
        flex: 1,
        justifyContent: 'center',
        resizeMode: 'stretch',
    },
    selectedPlayerName: {
        textAlign: 'center',
        color: 'green',
        margin: 10,
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
    buttonText: {
        color: 'darkblue',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    timer: {
        //alignSelf: 'top', doesnt work
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
    selectedHexagonSlice: {
        width: 200,
        height: 58,
        backgroundColor: '#000',
        margin: 2,
        borderRadius: 100,
        overflow: 'hidden',
        position: 'relative',
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