import React from 'react';
import { Share, TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Status, useSetStatusFavourited } from '../hooks/api';
import { StackParamList } from '../routes';
import { FavIcon, ReblogIcon, ShareIcon } from './Icons';
import Text from './Text';

interface StatusImageButtonBarProps {
  status: Status;
  navigation: StackNavigationProp<StackParamList, any>,
}

export default function StatusImageButtonBar({ status, navigation }: StatusImageButtonBarProps) {
  const [changeStatusFavourited] = useSetStatusFavourited();

  const share = () => {
    Share.share({ title: '', url: status.url }).then((result) => {
      console.warn('Share result', result);
    }, (error) => {
      console.warn('Share error', error);
    });
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
      <TouchableOpacity onPress={() => changeStatusFavourited({ status, favourited: !status.favourited })}>
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
  );
}
