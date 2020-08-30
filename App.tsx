import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/HomeScreen';
import StatusDetailScreen from './src/StatusDetailScreen';
import ProfilScreen from './src/ProfilScreen';
import LoginScreen from './src/LoginScreen';
import { StackParamList } from './src/routes';

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profil" component={ProfilScreen} />
        <Stack.Screen name="StatusDetail" component={StatusDetailScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
