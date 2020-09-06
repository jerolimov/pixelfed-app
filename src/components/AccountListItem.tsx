import React from 'react';
import { TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Account } from '../api';
import { StackParamList } from '../routes';
import AccountAvatarImage from './AccountAvatarImage';
import Text from './Text';

export type AccountListItemProps = {
  account: Account;
  navigation: StackNavigationProp<StackParamList, any>;
}

export default function AccountListItem({ account, navigation }: AccountListItemProps) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('AccountDetail', { account })}
      style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}
    >
      <AccountAvatarImage
        account={account}
        size={40}
      />
      <Text style={{ flex: 1, marginLeft: 10 }}>
        {account.display_name}
      </Text>
    </TouchableOpacity>
  )
}
