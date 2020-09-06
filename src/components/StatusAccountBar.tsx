import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';

import { Status } from '../api';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../routes';

import { MoreIcon } from './Icons';
import Text from './Text';

interface StatusAccountBarProps {
  status: Status;
  navigation: StackNavigationProp<StackParamList, any>,
}

export default function StatusAccountBar({ status, navigation }: StatusAccountBarProps) {
  const userDisplayName = status.account.display_name;
  const onProfilPressed = () => {
    navigation.push('AccountDetail', { account: status.account });
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingVertical: 5 }}>
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
  );
}
