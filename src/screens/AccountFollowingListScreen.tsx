import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Account, getAccountFollowing } from '../api';
import { Container, Text } from '../components/ThemeComponents';
import { StackParamList } from '../routes';

type AccountFollowingListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'AccountFollowingList'>,
  route: { params: { account: Account } };
}

export default function AccountFollowingListScreen({ navigation, route }: AccountFollowingListScreenProps) {
  const { account } = route.params;

  const [accounts, setAccounts] = useState<Account[]>();
  useEffect(() => {
    getAccountFollowing(account).then(setAccounts, (error) => console.warn('fetch error:', error));
  }, []);

  return (
    <ScrollView>
      <Container>
        {
          accounts?.map((account) => <AccountItem key={account.id} account={account} navigation={navigation} />)
        }
      </Container>
    </ScrollView>
  );
}

function AccountItem({ account, navigation }: { account: Account, navigation: StackNavigationProp<StackParamList, 'AccountFollowingList'>, }) {
  return (
    <TouchableOpacity
      onPress={() => navigation.push('AccountDetail', { account })}
      style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}
    >
      <Image
        source={{ uri: account.avatar_static }}
        style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }}
      />
      <Text style={{ flex: 1 }}>
        {account.display_name}
      </Text>
    </TouchableOpacity>
  )
}
