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
        <Stack.Screen name="AccountDetail" component={AccountDetailScreen} options={{ title: '' }} />
        <Stack.Screen name="AccountFollowersList" component={AccountFollowersListScreen} options={{ title: 'Followers' }} />
        <Stack.Screen name="AccountFollowingList" component={AccountFollowingListScreen} options={{ title: 'Following' }} />
        <Stack.Screen name="StatusDetail" component={StatusDetailScreen} options={{ title: '' }} />
        <Stack.Screen name="StatusFavouritedList" component={StatusFavouritedListScreen} options={{ title: 'Liked' }} />
        <Stack.Screen name="StatusRebloggedList" component={StatusRebloggedListScreen} options={{ title: 'Reblogged' }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
