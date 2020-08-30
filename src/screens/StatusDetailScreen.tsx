import React, { useState } from 'react';
import {
  Image,
  ImageLoadEventData,
  ScrollView,
  Text,
  TouchableOpacity,
  NativeSyntheticEvent,
  View,
  GestureResponderEvent,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import HTML, { HtmlAttributesDictionary } from "react-native-render-html";

import { Status } from '../api';
import { StackParamList } from '../routes';

type DetailsScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'StatusDetail'>,
  route: { params: { status: Status } };
}

export default function DetailsScreen({ navigation, route }: DetailsScreenProps) {
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
    navigation.push('Profil', { profilId: status.account.id });
  };
  const onLinkPressed = (
    _event: GestureResponderEvent,
    href: string,
    htmlAttribs: HtmlAttributesDictionary
  ) => {
    console.log('onLinkPress', href, htmlAttribs);
  };

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white' }}>
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
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity>
            <Text style={{ paddingVertical: 10, paddingRight: 10 }}>
              {status.favourites_count} Favs
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ paddingVertical: 10, paddingRight: 10 }}>
              {status.reblogs_count} Reblogs
            </Text>
          </TouchableOpacity>
        </View>
        <HTML html={html} onLinkPress={onLinkPressed} />
        <Text>Created {daysAgo} days ago</Text>
        <Text>{status.replies_count} replies</Text>
      </View>
    </ScrollView>
  );
}
