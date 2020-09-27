import React, { useEffect } from 'react';
import { Button, ScrollView } from 'react-native';
import { TextInput, List } from 'react-native-paper';
import { StackNavigationProp } from '@react-navigation/stack';

import { useAuth } from '../api/auth';
import { StackParamList } from '../routes';
import Container from '../components/Container';

type LoginScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Login'>,
}

export default function LoginScreen({ navigation }: LoginScreenProps) {
  
  const login = useAuth();

  useEffect(() => {
    login.setBaseUrl('https://pixelfed.social');
    login.setClientId('8853');
  }, []);

  const [text, setText] = React.useState('');

  return (
    <ScrollView>
      <Container>
        <Button title="Login" onPress={login.login} />

        <TextInput
          label="URL"
          value={text}
          onChangeText={setText}
          style={{ margin: 8 }}
        />

        <TextInput
          label="Client ID"
          value={text}
          onChangeText={setText}
          style={{ margin: 8 }}
        />

        <List.Item
          title="pixelfed.social"
          description={`https://pixelfed.social/\nClient ID: 1234`}
          onPress={() => alert('x')}
        />

      </Container>
    </ScrollView>
  );
}
