import React, { useState } from 'react';
import {
  Image,
  ImageLoadEventData,
  ScrollView,
  TouchableOpacity,
  NativeSyntheticEvent,
  View,
  GestureResponderEvent,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Status } from '../api';
import { Container, Text, HTML, HtmlAttributesDictionary } from '../components/ThemeComponents';
import { StackParamList } from '../routes';
import { FavIcon, ReblogIcon } from '../components/Icons';

type StatusDetailScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'StatusDetail'>,
  route: { params: { status: Status } };
}

export default function StatusDetailScreen({ navigation, route }: StatusDetailScreenProps) {
  const { status } = route.params;

  const userDisplayName = status.account.display_name;
  const imageUrl = status.media_attachments?.[0]?.preview_url;
  const daysAgoInMs = Date.now() - new Date(status.created_at).getTime();
  const oneDayInMs = 24 * 60 * 60 * 1000;
  const daysAgo = Math.round(daysAgoInMs / oneDayInMs);

  const [aspectRatio, setAspectRatio] = useState(1);

  const onImageLoaded = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    // console.log('Image loaded:', event.nativeEvent.source);
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
  };

  // Fix an issue with missing spaces between links (hashtags)
  // See also https://github.com/archriss/react-native-render-html/issues/261
  const html = status.content.replace(/\/a>\s<a/g, '/a>&shy; <a');

  const onProfilPressed = () => {
    navigation.push('AccountDetail', { account: status.account });
  };
  const onLinkPressed = (
    _event: GestureResponderEvent,
    href: string,
    htmlAttribs: HtmlAttributesDictionary
  ) => {
    console.log('onLinkPress', href, htmlAttribs);
  };

  return (
    <ScrollView>
      <Container>
        <View style={{ flexDirection: 'row', padding: 10 }}>
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
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={{ aspectRatio }}
          onLoad={onImageLoaded}
        />
        <View style={{ padding: 10 }}>
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
      </Container>
    </ScrollView>
  );
}
