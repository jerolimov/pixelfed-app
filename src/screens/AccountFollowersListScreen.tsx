import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Account, getAccountFollowers } from '../api';
import { StackParamList } from '../routes';
import Container from '../components/Container';
import AccountListItem from '../components/AccountListItem';

type AccountFollowersListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'AccountFollowersList'>,
  route: { params: { account: Account } };
}

export default function AccountFollowersListScreen({ navigation, route }: AccountFollowersListScreenProps) {
  const { account } = route.params;

  const [accounts, setAccounts] = useState<Account[]>();
  useEffect(() => {
    getAccountFollowers(account).then(setAccounts, (error) => console.warn('fetch error:', error));
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
