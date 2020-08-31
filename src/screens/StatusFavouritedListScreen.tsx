import React, { useState, useEffect } from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Status, Account, getStatusFavouritedBy } from '../api';
import { Container, Text } from '../components/ThemeComponents';
import { StackParamList } from '../routes';

type StatusFavouritedListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'StatusFavouritedList'>,
  route: { params: { status: Status } };
}

export default function StatusFavouritedListScreen({ navigation, route }: StatusFavouritedListScreenProps) {
  const { status } = route.params;

  const [accounts, setAccounts] = useState<Account[]>();
  useEffect(() => {
    getStatusFavouritedBy(status).then(setAccounts, (error) => console.warn('fetch error:', error));
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

function AccountItem({ account, navigation }: { account: Account, navigation: StackNavigationProp<StackParamList, 'StatusFavouritedList'>, }) {
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