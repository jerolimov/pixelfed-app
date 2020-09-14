import React from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from '../routes';
import Container from '../components/Container';
import Text from '../components/Text';

type NotificationListScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'NotificationList'>,
}

export default function NotificationListScreen({ navigation }: NotificationListScreenProps) {
  return (
    <ScrollView>
      <Container>
        <Text>Friend Requests</Text>
        <Text>New</Text>
        <Text>Earlier</Text>
      </Container>
    </ScrollView>
  );
}
