import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Status, Account, getStatusRebloggedBy } from '../api';
import Container from '../components/Container';
import { StackParamList } from '../routes';
import AccountListItem from '../components/AccountListItem';

type StatusRebloggedListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'StatusRebloggedList'>,
  route: { params: { status: Status } };
}

export default function StatusRebloggedListScreen({ navigation, route }: StatusRebloggedListScreenProps) {
  const { status } = route.params;

  const [accounts, setAccounts] = useState<Account[]>();
  useEffect(() => {
    getStatusRebloggedBy(status).then(setAccounts, (error) => console.warn('fetch error:', error));
  }, []);

  return (
    <ScrollView>
      <Container>
        {
          accounts?.map((account) => (
            <AccountListItem
              key={account.id}
              account={account}
              navigation={navigation}
            />
          ))
        }
      </Container>
    </ScrollView>
  );
}
