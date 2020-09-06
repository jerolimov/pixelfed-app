import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Status, Account, getStatusFavouritedBy } from '../api';
import Container from '../components/Container';
import { StackParamList } from '../routes';
import AccountListItem from '../components/AccountListItem';

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
