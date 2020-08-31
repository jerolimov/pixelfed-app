import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  NativeSyntheticEvent,
  ImageLoadEventData,
  GestureResponderEvent,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from '../routes';
import { Container, Text, HTML, HtmlAttributesDictionary } from '../components/ThemeComponents';
import { getTimelineHome, Status } from '../api';
import { FavIcon, ReblogIcon } from '../components/Icons';

type HomeScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Home'>,
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const [statuses, setStatuses] = useState<Status[]>();
  useEffect(() => {
    getTimelineHome().then(setStatuses, (error) => console.warn('fetch error:', error));
  }, []);

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
          statuses?.map(status => <StatusItem key={status.id} status={status} navigation={navigation} />)
        }
      </Container>
    </ScrollView>
  );
}

function StatusItem({ status, navigation }: { status: Status, navigation: StackNavigationProp<StackParamList, 'Home'> }) {
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

  // Fix an issue with missing spaces between links (hashtags)
  // See also https://github.com/archriss/react-native-render-html/issues/261
  const html = status.content.replace(/\/a>\s<a/g, '/a>&shy; <a');

  return (
    <View style={{ padding: 10, margin: 10 }}>
      <View style={{ flexDirection: 'row', paddingVertical: 10 }}>
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
          <Text>...</Text>
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
        <TouchableOpacity>
          <FavIcon enabled={status.favourites_count > 0} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('StatusFavouritedList', { status })}>
          <Text style={{ padding: 5, paddingRight: 20 }}>
            {status.favourites_count} Favs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <ReblogIcon enabled={status.favourites_count > 0} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.push('StatusRebloggedList', { status })}>
          <Text style={{ padding: 5, paddingRight: 20 }}>
            {status.reblogs_count} Reblogs
          </Text>
        </TouchableOpacity>
      </View>
      <HTML html={html} onLinkPress={onLinkPressed} containerStyle={{ paddingVertical: 5 }} />
      <Text style={{ paddingVertical: 5 }}>Created {daysAgo} days ago</Text>
      <Text style={{ paddingVertical: 5 }}>{status.replies_count} replies</Text>
    </View>
  )
}
