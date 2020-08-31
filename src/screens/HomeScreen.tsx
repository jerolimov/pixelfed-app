import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  NativeSyntheticEvent,
  ImageLoadEventData,
  GestureResponderEvent,
  Share,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from '../routes';
import { Container, Text, HTML, HtmlAttributesDictionary } from '../components/ThemeComponents';
import { getTimelineHome, Status, setStatusFavourited } from '../api';
import { FavIcon, ReblogIcon, ShareIcon, MoreIcon } from '../components/Icons';

type HomeScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Home'>,
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [statuses, setStatuses] = useState<Status[]>();
  useEffect(() => {
    getTimelineHome().then(setStatuses, (error) => console.warn('fetch error:', error));
  }, []);

  const updateStatus = (status: Status) => {
    setStatuses(statuses => statuses?.map(s => s.id === status.id ? status : s));
  };

  return (
    <ScrollView>
      <Container>
        {/*
        <Button
          title="Login"
          onPress={() => navigation.navigate('Login')}
        />
        */}
        {
          statuses?.map(status => (
            <StatusItem
              key={status.id}
              status={status}
              navigation={navigation}
              onUpdateStatus={updateStatus}
            />
          ))
        }
      </Container>
    </ScrollView>
  );
}

function StatusItem({ status, navigation, onUpdateStatus }: { status: Status, navigation: StackNavigationProp<StackParamList, 'Home'>, onUpdateStatus: (status: Status) => void }) {
  const [aspectRatio, setAspectRatio] = useState(1);

  const userDisplayName = status.account.display_name;
  const imageUrl = status.media_attachments?.[0]?.preview_url;
  const daysAgoInMs = Date.now() - new Date(status.created_at).getTime();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const daysAgo = Math.round(daysAgoInMs / oneDayInMs);

  const onImageLoaded = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    // console.log('Image loaded:', event.nativeEvent.source);
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
  };
  const onProfilPressed = () => {
    navigation.push('AccountDetail', { account: status.account });
  };
  const onImagePressed = () => {
    navigation.push('StatusDetail', { status });
  };
  const onLinkPressed = (
    _event: GestureResponderEvent,
    href: string,
    htmlAttribs: HtmlAttributesDictionary
  ) => {
    console.log('onLinkPress', href, htmlAttribs);
  };
  const changeStatusFavourited = (favourited: boolean) => {
    setStatusFavourited(status, favourited).then(onUpdateStatus, (error) => {
      console.warn('Changed failed', error);
    })
  }
  const share = () => {
    Share.share({ title: '', url: status.url }).then((result) => {
      console.warn('Share result', result);
    }, (error) => {
      console.warn('Share error', error);
    });
  };

  return (
    <View style={{ padding: 10, margin: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
        <TouchableOpacity
          onPress={onProfilPressed}
          style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        >
          <Image
            source={{ uri: status.account.avatar_static }}
            style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
          />
          <Text style={{ flex: 1 }}>
            {userDisplayName}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <MoreIcon />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onImagePressed}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={{ aspectRatio }}
          onLoad={onImageLoaded}
        />
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
        <TouchableOpacity onPress={() => changeStatusFavourited(!status.favourited)}>
          <FavIcon active={status.favourited} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('StatusFavouritedList', { status })}>
          <Text style={{ padding: 5, paddingRight: 20 }}>
            {status.favourites_count} Favs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <ReblogIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('StatusRebloggedList', { status })}>
          <Text style={{ padding: 5, paddingRight: 20 }}>
            {status.reblogs_count} Reblogs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={share}>
          <ShareIcon />
        </TouchableOpacity>
      </View>
      <HTML html={status.content} onLinkPress={onLinkPressed} containerStyle={{ paddingVertical: 5 }} />
      <Text style={{ paddingVertical: 5 }}>Created {daysAgo} days ago</Text>
      <Text style={{ paddingVertical: 5 }}>{status.replies_count} replies</Text>
    </View>
  )
}
