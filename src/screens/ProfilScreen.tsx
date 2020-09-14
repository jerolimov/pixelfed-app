import React from 'react';
import { Image, View, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { MaterialIcons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

import { StackParamList } from '../routes';
import Container from '../components/Container';
import Text from '../components/Text';
import { useTheme } from '@react-navigation/native';

type ProfilScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'Profil'>,
}

export default function ProfilScreen({ navigation }: ProfilScreenProps) {
  const theme = useTheme();
  const iconColor = theme.colors.text;

  return (
    <ScrollView>
      <Container>
        <Text style={{ paddingHorizontal: 10, paddingVertical: 15, fontSize: 18, fontWeight: 'bold' }}>
          You profil
        </Text>
        <AccountItem name="Profil Abcdef" />
        <AccountItem name="Another profil ghij" />

        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', width: 32 }}>
            <MaterialIcons name="rate-review" size={24} color={iconColor} />
          </View>
          <Text>
            Rate this app
          </Text>
        </View>

        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', width: 32 }}>
            <FontAwesome5 name="file-contract" size={24} color={iconColor} />
          </View>
          <Text>
            Terms of Service
          </Text>
        </View>

        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', width: 32 }}>
            <MaterialCommunityIcons name="license" size={24} color={iconColor} />
          </View>
          <Text>
            Used libraries / Licenses
          </Text>
        </View>

        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', width: 32 }}>
            <MaterialIcons name="help" size={24} color={iconColor} />
          </View>
          <Text>
            Help / Support
          </Text>
        </View>

        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', width: 32 }}>
            <MaterialIcons name="settings" size={24} color={iconColor} />
          </View>
          <Text>
            Settings
          </Text>
        </View>

        <View style={{ padding: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ alignItems: 'center', width: 32 }}>
            <MaterialCommunityIcons name="logout" size={24} color="#cc0000" />
          </View>
          <Text style={{ color: '#cc0000' }}>
            Logout
          </Text>
        </View>

      </Container>
    </ScrollView>
  );
}

type AccountItemProps = {
  name: string;
}

function AccountItem({ name }: AccountItemProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', padding: 5 }}>
      <Image
        source={{ uri: 'https://pixelfed.social/storage/avatars/018/460/212/306/811/699/2/lnCyWgOSB7w7QeSSNrzi_avatar.jpeg?v=2' }}
        style={{ width: 40, height: 40, borderRadius: 20 }}
      />
      <Text style={{ flex: 1, marginLeft: 10 }}>
        {name}
      </Text>
    </View>
  )
}
