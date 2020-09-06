import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { Account, getAccountFollowing } from '../api';
import { StackParamList } from '../routes';
import Container from '../components/Container';
import AccountListItem from '../components/AccountListItem';

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
