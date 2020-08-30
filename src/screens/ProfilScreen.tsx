import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  NativeSyntheticEvent,
  ImageLoadEventData,
  GestureResponderEvent,
  Dimensions,
  LayoutChangeEvent,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTML, { HtmlAttributesDictionary } from "react-native-render-html";

import { StackParamList } from '../routes';

import { getAccount, getAccountStatuses, Account, Status } from '../api';

type ProfilScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Profil'>,
}

export default function ProfilScreen({ navigation }: ProfilScreenProps) {
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [account, setAccount] = useState<Account>();
  const [statuses, setStatuses] = useState<Status[]>();
  useEffect(() => {
    getAccount('184602123068116992').then(setAccount, (error) => console.warn('fetch error:', error));
  }, []);
  useEffect(() => {
    getAccountStatuses('184602123068116992').then(setStatuses, (error) => console.warn('fetch error:', error));
  }, []);

  const updateLayout = (event: LayoutChangeEvent) => {
    const windowWidth = event.nativeEvent.layout.width;
    if (width !== windowWidth) {
      setWidth(width);
    }
  };

  const minImageWidth = 110;
  const padding = 10;
  const columnCount = Math.floor((width - padding) / minImageWidth);
  const imageSize = (width - padding) / columnCount;

  return (
    <ScrollView onLayout={updateLayout}>
      {
        account ? (
          <View style={{ backgroundColor: 'white' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingTop: 20 }}>
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
            <View style={{ flexDirection: 'row', paddingTop: 20, paddingHorizontal: 5 }}>
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
      <View style={{ flexDirection: 'row', flexWrap: 'wrap', backgroundColor: 'white', padding: 5 }}>
        {
          statuses?.map(status => (
            <QuadraticStatusItem
              key={status.id}
              size={imageSize}
              status={status}
              navigation={navigation}
            />
          ))
        }
      </View>
    </ScrollView>
  );
}

interface QuadraticStatusItemProps {
  size: number;
  status: Status;
  navigation: StackNavigationProp<StackParamList, 'Profil'>;
}

function QuadraticStatusItem({ size, status, navigation }: QuadraticStatusItemProps) {
  const imageUrl = status.media_attachments?.[0]?.preview_url;

  return (
    <TouchableOpacity
      onPress={() => navigation.push('StatusDetail', { status })}
      style={{ width: size }}
    >
      <Image
        source={{ uri: imageUrl }}
        resizeMode="cover"
        style={{ width: size - 10, height: size - 10, margin: 5 }}
      />
    </TouchableOpacity>
  )
}
