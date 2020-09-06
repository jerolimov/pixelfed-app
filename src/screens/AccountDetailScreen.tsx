import React, { useEffect, useState, useLayoutEffect } from 'react';
import { TouchableOpacity, View, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { getAccount, Account } from '../api';
import { StackParamList } from '../routes';
import Container from '../components/Container';
import Text from '../components/Text';
import AccountAvatarImage from '../components/AccountAvatarImage';
import AccountStatusGrid from '../components/AccountStatusGrid';

type AccountDetailScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'AccountDetail'>,
  route: { params: { account: Account } };
}

export default function AccountDetailScreen({ navigation, route }: AccountDetailScreenProps) {
  const [account, setAccount] = useState<Account>(route.params.account);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: account.display_name,
      headerBackTitleVisible: false,
    });
  }, [account]);

  useEffect(() => {
    getAccount(account).then(setAccount, (error) => console.warn('fetch error:', error));
  }, []);

  return (
    <ScrollView>
      <Container>
        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AccountAvatarImage
              account={account}
              size={60}
            />
            <View style={{ paddingLeft: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>{account.display_name}</Text>
              <Text>Username: {account.username}</Text>
              <View style={{ flexDirection: 'row' }}>
                {account.is_admin ? <Text>Admin</Text> : null}
                {account.locked ? <Text>Locked</Text> : null}
              </View>
            </View>
          </View>
          <View style={{ flexDirection: 'row', paddingTop: 20 }}>
            <TouchableOpacity
              onPress={() => navigation.push('AccountFollowersList', { account })}
              style={{ flex: 1 }}
            >
              <Text style={{ fontSize: 22, textAlign: 'center' }}>{account.followers_count}</Text>
              <Text style={{ textAlign: 'center' }}>Followers</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.push('AccountFollowingList', { account })}
              style={{ flex: 1 }}
            >
              <Text style={{ fontSize: 22, textAlign: 'center' }}>{account.following_count}</Text>
              <Text style={{ textAlign: 'center' }}>Following</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 22, textAlign: 'center' }}>{account.statuses_count}</Text>
              <Text style={{ textAlign: 'center' }}>Statuses</Text>
            </View>
          </View>
        </View>
        <AccountStatusGrid account={account} navigation={navigation} />
      </Container>
    </ScrollView>
  );
}
