import React, { useEffect, useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  NativeSyntheticEvent,
  ImageLoadEventData,
  GestureResponderEvent,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTML, { HtmlAttributesDictionary } from "react-native-render-html";

import { StackParamList } from './routes';

import { getAccount, getAccountStatuses, Account, Status } from './api';

type ProfilScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Profil'>,
}

export default function ProfilScreen({ navigation }: ProfilScreenProps) {
  const [account, setAccount] = useState<Account>();
  const [statuses, setStatuses] = useState<Status[]>();
  useEffect(() => {
    getAccount('184602123068116992').then(setAccount, (error) => console.warn('fetch error:', error));
  }, []);
  useEffect(() => {
    getAccountStatuses('184602123068116992').then(setStatuses, (error) => console.warn('fetch error:', error));
  }, []);

  return (
    <ScrollView>
      {
        account ? (
          <View style={{ backgroundColor: 'white', padding: 20 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image
                source={{ uri: account.avatar_static }}
                style={{ width: 60, height: 60, borderRadius: 30, marginRight: 10 }}
              />
              <View>
                <Text style={{ fontWeight: 'bold' }}>{account.display_name}</Text>
                <Text>Username: {account.username}</Text>
                <View style={{ flexDirection: 'row' }}>
                  {account.is_admin ? <Text>Admin</Text> : null}
                  {account.locked ? <Text>Locked</Text> : null}
                </View>
              </View>
            </View>
            <View style={{ flexDirection: 'row', paddingTop: 20 }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 22, textAlign: 'center' }}>{account.followers_count}</Text>
                <Text style={{ textAlign: 'center' }}>followers</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 22, textAlign: 'center' }}>{account.following_count}</Text>
                <Text style={{ textAlign: 'center' }}>following</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 22, textAlign: 'center' }}>{account.statuses_count}</Text>
                <Text style={{ textAlign: 'center' }}>statuses</Text>
              </View>
            </View>
          </View>
        ) : null
      }
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {
          statuses?.map(status => <StatusItem key={status.id} status={status} navigation={navigation} />)
        }
      </View>
    </ScrollView>
  );
}

function StatusItem({ status, navigation }: { status: Status, navigation: StackNavigationProp<StackParamList, 'Profil'> }) {
  const imageUrl = status.media_attachments?.[0]?.preview_url;
  const size = 110;

  return (
    <Image
      source={{ uri: imageUrl }}
      resizeMode="cover"
      style={{ width: size, height: size, margin: 10 }}
    />
  )
}
