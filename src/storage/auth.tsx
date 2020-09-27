import AsyncStorage from '@react-native-community/async-storage';
import * as SecureStore from 'expo-secure-store';

const keyPrefix = 'pixelfed/auth/'

export interface AccountMetadata {
  id: string;
  displayName: string;
  baseURL: string;
}

export interface AccountSecret {
  accessToken: string;
}

const defaultSecureStoreOptions: SecureStore.SecureStoreOptions = {
  keychainAccessible: SecureStore.ALWAYS_THIS_DEVICE_ONLY
};

export async function loadAccounts(): Promise<AccountMetadata[]> {
  const key = keyPrefix + 'accounts';
  const json = await AsyncStorage.getItem(key);
  return json ? JSON.parse(json) : [];
}

export async function saveAccounts(accounts: AccountMetadata[]): Promise<void> {
  const key = keyPrefix + 'accounts';
  const value = JSON.stringify(accounts);
  return AsyncStorage.setItem(key, value);
}

export async function loadAccountSecret(id: string): Promise<Account | null> {
  const key = keyPrefix + 'account/' + id;
  const json = await SecureStore.getItemAsync(key, defaultSecureStoreOptions);
  return json ? JSON.parse(json) : null;
}

export async function saveAccountSecret(id: string, accountSecret: AccountSecret): Promise<void> {
  const key = keyPrefix + 'account/' + id;
  const value = JSON.stringify(accountSecret);
  return SecureStore.setItemAsync(key, value, defaultSecureStoreOptions);
}

export async function deleteAccountSecret(id: string): Promise<void> {
  const key = keyPrefix + 'account/' + id;
  return SecureStore.deleteItemAsync(key, defaultSecureStoreOptions);
}
