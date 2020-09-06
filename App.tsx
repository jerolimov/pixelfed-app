import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator, SharedElementCompatRoute, SharedElementsConfig } from 'react-navigation-shared-element';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import TimelineHomeScreen from './src/screens/TimelineHomeScreen';
import AccountDetailScreen from './src/screens/AccountDetailScreen';
import AccountFollowersListScreen from './src/screens/AccountFollowersListScreen';
import AccountFollowingListScreen from './src/screens/AccountFollowingListScreen';
import StatusDetailScreen, { getSharedElementPreviewImageConfig } from './src/screens/StatusDetailScreen';
import StatusFavouritedListScreen from './src/screens/StatusFavouritedListScreen';
import StatusRebloggedListScreen from './src/screens/StatusRebloggedListScreen';
import LoginScreen from './src/screens/LoginScreen';
import { StackParamList } from './src/routes';
import { DarkTheme, LightTheme } from './src/themes';

const handle = (
  screenName: string,
  route: SharedElementCompatRoute,
  otherRoute: SharedElementCompatRoute,
  showing: boolean,
): SharedElementsConfig | undefined => {
  let result: SharedElementsConfig | undefined;

  console.log(`handle screenName=${screenName} route=${route.name} otherRoute=${otherRoute.name} showing=${showing} animated=${route.params.animated}/${otherRoute.params.animated}`);
  // console.log('- route:', { name: route.name, key: route.key, paramKeys: Object.keys(route.params) });
  // console.log('- otherRoute:', { name: otherRoute.name, key: otherRoute.key, paramKeys: Object.keys(otherRoute.params) });

  // TimelineHome => StatusDetail
  // handle screenName=StatusDetail route=StatusDetail otherRoute=TimelineHome showing=true
  // handle screenName=TimelineHome route=TimelineHome otherRoute=StatusDetail showing=false
  if (
    (screenName === 'StatusDetail' && route.name === 'StatusDetail' && otherRoute.name === 'TimelineHome' && showing) ||
    (screenName === 'TimelineHome' && route.name === 'TimelineHome' && otherRoute.name === 'StatusDetail' && !showing)
  ) {
    console.log('Case 1');
    const status = showing ? route.params.status : otherRoute.params.status;
    result = [getSharedElementPreviewImageConfig(status)];
  } else

  // TimelineHome <= StatusDetail
  // handle screenName=TimelineHome route=TimelineHome otherRoute=StatusDetail showing=true
  // handle screenName=StatusDetail route=StatusDetail otherRoute=TimelineHome showing=false
  if (
    (screenName === 'TimelineHome' && route.name === 'TimelineHome' && otherRoute.name === 'StatusDetail' && showing) ||
    (screenName === 'StatusDetail' && route.name === 'StatusDetail' && otherRoute.name === 'TimelineHome' && !showing)
  ) {
    console.log('Case 2');
    const status = showing ? otherRoute.params.status : route.params.status;
    result = [getSharedElementPreviewImageConfig(status)];
  } else
  
  // StatusDetail => AccountDetail
  // handle screenName=StatusDetail route=StatusDetail otherRoute=AccountDetail showing=true
  // handle screenName=AccountDetail route=AccountDetail otherRoute=StatusDetail showing=false
  if (
    (screenName === 'StatusDetail' && route.name === 'StatusDetail' && otherRoute.name === 'AccountDetail' && showing)
  ) {
    console.log('Case 3a');
    // const status = showing ? route.params.status : otherRoute.params.status;
    // result = [getSharedElementPreviewImageConfig(status)];
  } else if (
    (screenName === 'AccountDetail' && route.name === 'AccountDetail' && otherRoute.name === 'StatusDetail' && !showing)
  ) {
    console.log('Case 3b');
    // const status = showing ? route.params.status : otherRoute.params.status;
    // result = [getSharedElementPreviewImageConfig(status)];
  } else

  // StatusDetail <= AccountDetail
  // handle screenName=AccountDetail route=AccountDetail otherRoute=StatusDetail showing=true
  // handle screenName=StatusDetail route=StatusDetail otherRoute=AccountDetail showing=false
  if (
    (screenName === 'AccountDetail' && route.name === 'AccountDetail' && otherRoute.name === 'StatusDetail' && showing)
  ) {
    console.log('Case 4a');
    // const status = showing ? otherRoute.params.status : route.params.status;
    // result = [getSharedElementPreviewImageConfig(status)];
  } else if (
    (screenName === 'StatusDetail' && route.name === 'StatusDetail' && otherRoute.name === 'AccountDetail' && !showing)
  ) {
    console.log('Case 4b');
    // const status = showing ? otherRoute.params.status : route.params.status;
    // result = [getSharedElementPreviewImageConfig(status)];
  } else

  // Unknown or unhandled case
  {
    console.log('Unknown or unhandled case');
  }

  // console.log(`- result:`, result);
  return result;
}

const Stack = createSharedElementStackNavigator<StackParamList>();
const HomeTab = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="TimelineHome"
      component={TimelineHomeScreen}
      options={{ title: 'Home' }}
      sharedElements={(route, otherRoute, showing) => handle('TimelineHome', route, otherRoute, showing)}
    />
    <Stack.Screen
      name="AccountDetail"
      component={AccountDetailScreen}
      options={{ title: '' }}
      sharedElements={(route, otherRoute, showing) => handle('AccountDetail', route, otherRoute, showing)}
    />
    <Stack.Screen name="AccountFollowersList" component={AccountFollowersListScreen} options={{ title: 'Followers' }} />
    <Stack.Screen name="AccountFollowingList" component={AccountFollowingListScreen} options={{ title: 'Following' }} />
    <Stack.Screen
      name="StatusDetail"
      component={StatusDetailScreen}
      options={{ title: '' }}
      sharedElements={(route, otherRoute, showing) => handle('StatusDetail', route, otherRoute, showing)}
    />
    <Stack.Screen name="StatusFavouritedList" component={StatusFavouritedListScreen} options={{ title: 'Liked' }} />
    <Stack.Screen name="StatusRebloggedList" component={StatusRebloggedListScreen} options={{ title: 'Reblogged' }} />
    <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Login' }} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Settings" component={HomeTab} />
    </Tab.Navigator>
  );
}

const Tab2 = createMaterialBottomTabNavigator();

function MyTabs2() {
  return (
    <Tab2.Navigator>
      <Tab2.Screen name="Home" component={HomeTab} />
      <Tab2.Screen name="Settings" component={HomeTab} />
    </Tab2.Navigator>
  );
}

export default function App() {
  const colorScheme = useColorScheme();

  return (
    <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : LightTheme}>
      <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
      <MyTabs />
    </NavigationContainer>
  );
}
