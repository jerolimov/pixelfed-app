import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import AccountDetailScreen from './src/screens/AccountDetailScreen';
import AccountFollowersListScreen from './src/screens/AccountFollowersListScreen';
import AccountFollowingListScreen from './src/screens/AccountFollowingListScreen';
import StatusDetailScreen from './src/screens/StatusDetailScreen';
import StatusFavouritedListScreen from './src/screens/StatusFavouritedListScreen';
import StatusRebloggedListScreen from './src/screens/StatusRebloggedListScreen';
import LoginScreen from './src/screens/LoginScreen';
import { StackParamList } from './src/routes';
import { DarkTheme, LightTheme } from './src/themes';

const Stack = createStackNavigator<StackParamList>();

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AccountDetail" component={AccountDetailScreen} />
        <Stack.Screen name="AccountFollowersList" component={AccountFollowersListScreen} />
        <Stack.Screen name="AccountFollowingList" component={AccountFollowingListScreen} />
        <Stack.Screen name="StatusDetail" component={StatusDetailScreen} />
        <Stack.Screen name="StatusFavouritedList" component={StatusFavouritedListScreen} />
        <Stack.Screen name="StatusRebloggedList" component={StatusRebloggedListScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
