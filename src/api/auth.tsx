import { useEffect, useState } from 'react';
import {
  useAuthRequest,
  makeRedirectUri,
  AuthRequestConfig,
  DiscoveryDocument,
  ResponseType,
} from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';

export function useAuth() {
  useEffect(() => {
    WebBrowser.warmUpAsync();
    return () => {
      WebBrowser.coolDownAsync();
    };
  }, []);

  const useProxy = true;
  const [baseUrl, setBaseUrl] = useState<string>();
  const [clientId, setClientId] = useState<string>();
  const [accessToken, setAccessToken] = useState<string>();

  const scopes = ['read', 'write', 'follow'];
  const redirectUri = makeRedirectUri({
    useProxy,
    preferLocalhost: true,
    // native: 'exp://127.0.0.1:19000/redirect',
  });
  const config: AuthRequestConfig = {
    clientId: clientId!,
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
      if (result.type === 'success' && result.params) {
        console.warn('success login params:', result.params);
        setAccessToken(result.params.access_token)
      } else {
        console.warn('unhandled result', result);
      }
    }
  }, [result]);

  return {
    baseUrl,
    setBaseUrl,
    clientId,
    setClientId,
    login,
    accessToken,
  };
}
