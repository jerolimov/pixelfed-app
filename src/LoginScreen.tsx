import React, { useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import {
  useAuthRequest,
  makeRedirectUri,
  AuthRequestConfig,
  DiscoveryDocument,
  ResponseType,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

import { StackNavigationProp } from '@react-navigation/stack';

import { baseUrl } from './config';
import { StackParamList } from './routes';

type LoginScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Login'>,
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  React.useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const useProxy = true;
  const clientId = '8853';
  const scopes = ['read', 'write', 'follow'];
  const redirectUri = makeRedirectUri({
    useProxy,
    preferLocalhost: true,
    // native: 'exp://127.0.0.1:19000/redirect',
  });
  const config: AuthRequestConfig = {
    clientId,
    scopes,
    redirectUri,
    responseType: ResponseType.Token,
  };
  const discovery: DiscoveryDocument = {
    authorizationEndpoint: baseUrl + '/oauth/authorize',
    tokenEndpoint: baseUrl + '/oauth/token',
    // revocationEndpoint: baseUrl + '/oauth/revoke',
  }

  const [request, result, promptAsync] = useAuthRequest(config, discovery);
  const login = () => {
    console.warn('Login... with redirectUri =', redirectUri);
    promptAsync({ useProxy });
  }
  useEffect(() => {
    if (request) {
      console.warn('request', request);
    }
  }, [request]);
  useEffect(() => {
    if (result) {
      if (result.type === 'success') {
        console.warn('success login params:', result.params);
      } else {
        console.warn('unhandled result', result);
      }
    }
  }, [result]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Login3" onPress={login} />

      <Text>baseUrl = {baseUrl}</Text>
      <Text>clientId = {clientId}</Text>
      <Text>redirectUri = {redirectUri}</Text>
    </View>
  );
}
