import React, { useEffect, useState, useLayoutEffect } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  ImageLoadEventData,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';

import { StackParamList } from '../routes';
import { Container, Text } from '../components/ThemeComponents';

import { getAccount, getAccountStatuses, Account, Status } from '../api';
import { getSharedElementPreviewImageId } from './StatusDetailScreen';

type AccountDetailScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'AccountDetail'>,
  route: { params: { account: Account } };
}

export default function AccountDetailScreen({ navigation, route }: AccountDetailScreenProps) {
  const [width, setWidth] = useState(Dimensions.get('window').width);
  const [account, setAccount] = useState<Account>(route.params.account);
  const [statuses, setStatuses] = useState<Status[]>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: account.display_name,
      headerBackTitleVisible: false,
    });
  }, [account]);

  useEffect(() => {
    getAccount(account).then(setAccount, (error) => console.warn('fetch error:', error));
  }, []);
  useEffect(() => {
    getAccountStatuses(account).then(setStatuses, (error) => console.warn('fetch error:', error));
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
      <Container>
        {
          account ? (
            <View>
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
                <TouchableOpacity
                  onPress={() => navigation.push('AccountFollowersList', { account })}
                  style={{ flex: 1 }}
                >
                  <Text style={{ fontSize: 22, textAlign: 'center' }}>{account.followers_count}</Text>
                  <Text style={{ textAlign: 'center' }}>Followers</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.push('AccountFollowingList', { account })}
                  style={{ flex: 1 }}
                >
                  <Text style={{ fontSize: 22, textAlign: 'center' }}>{account.following_count}</Text>
                  <Text style={{ textAlign: 'center' }}>Following</Text>
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 22, textAlign: 'center' }}>{account.statuses_count}</Text>
                  <Text style={{ textAlign: 'center' }}>Statuses</Text>
                </View>
              </View>
            </View>
          ) : null
        }
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
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
      </Container>
    </ScrollView>
  );
}

interface QuadraticStatusItemProps {
  size: number;
  status: Status;
  navigation: StackNavigationProp<StackParamList, 'AccountDetail'>;
}

function QuadraticStatusItem({ size, status, navigation }: QuadraticStatusItemProps) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const imageUrl = status.media_attachments?.[0]?.preview_url;

  const onImageLoaded = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    // console.log('Image loaded:', event.nativeEvent.source);
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.push('StatusDetail', { status, aspectRatio, animated: true })}
      style={{ width: size }}
    >
      <SharedElement id={getSharedElementPreviewImageId(status)}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={{ width: size - 10, height: size - 10, margin: 5 }}
          onLoad={onImageLoaded}
        />
      </SharedElement>        
    </TouchableOpacity>
  )
}
