import React from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from '../routes';
import Container from '../components/Container';
import TextInput from '../components/TextInput';

type SearchScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Search'>,
}

export default function SearchScreen({ navigation }: SearchScreenProps) {
  return (
    <ScrollView>
      <Container>
        <TextInput
          placeholder="Search..."
          keyboardType="web-search"
          returnKeyType="search"
          blurOnSubmit
          onSubmitEditing={() => console.warn('onSubmitEditing')}
          onEndEditing={() => console.warn('onEndEditing')}
        />
      </Container>
    </ScrollView>
  );
}
