import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from './src/components/LoginPage'
import React, { useState, useEffect } from 'react';

import SplashScreen from './src/components/SplashScreen'
import SignUpScreen from './src/components/SignUpScreen'
import GameLobby from './src/components/GameLobby';
import CreateGame from './src/components/CreateGameScreen';
import JoinGame from './src/components/JoinGameScreen';
import GameScreen from './src/components/GameScreen';

import { firebase as authProvider } from '@react-native-firebase/auth';
import { AuthContext, CodeContext, HostContext, MissionContext, RoleContext } from './src/services/gameState';

const AuthStack = createNativeStackNavigator();
const GameStack = createNativeStackNavigator();

//There are TWO seperate stack navigators. Only a verified, logged in user can access the GameNavigator 
const AuthNavigator = () => (
  <AuthStack.Navigator initialRouteName="SplashScreen">
    <AuthStack.Screen name="SplashScreen" component={SplashScreen} />
    <AuthStack.Screen name="SignUpScreen" component={SignUpScreen} />
    <AuthStack.Screen name="LoginPage" component={LoginPage} />
  </AuthStack.Navigator>
);

const GameNavigator = () => {
  //track the current game conditions using, code, host, mission, and role
  const [code, setCode] = useState(null);
  const [host, setHost] = useState(null);
  const [mission, setMission] = useState(null);
  const [role, setRole] = useState(null);

  return (
    <HostContext.Provider value={{ host, setHost }}>
      <CodeContext.Provider value={{ code, setCode }}>
        <MissionContext.Provider value={{ mission, setMission }}>
          <RoleContext.Provider value={{ role, setRole }}>
            <GameStack.Navigator initialRouteName="GameLobby">
              <GameStack.Screen name="GameLobby" component={GameLobby} />
              <GameStack.Screen name="CreateGame" component={CreateGame} />
              <GameStack.Screen name="JoinGame" component={JoinGame} />
              <GameStack.Screen name="GameScreen" component={GameScreen} />
            </GameStack.Navigator>
          </RoleContext.Provider>
        </MissionContext.Provider>
      </CodeContext.Provider>
    </HostContext.Provider>
  )
};

export default function App() {


  //initialize the authentication state when the app loads,
  // and other screens will pull this context to access 
  // the user profile 
  
  const [user, setUser] = useState(null);

  useEffect(() => {


    const FIREBASE_AUTH = authProvider.auth();

    FIREBASE_AUTH.onAuthStateChanged((user) => {
  
      setUser(user);
    })
  }, []);


  //Decide which stack navigator to call based on whether or not user is logged in
  return (
    <AuthContext.Provider value={{ user, setUser }}>

      <NavigationContainer>
        {user ? <GameNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}


