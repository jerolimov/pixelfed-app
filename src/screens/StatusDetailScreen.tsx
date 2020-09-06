import React, { useState } from 'react';
import { ScrollView, } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SharedElementConfig } from 'react-navigation-shared-element';

import { Status } from '../api';
import { StackParamList } from '../routes';
import Container from '../components/Container';
import StatusImage from '../components/StatusImage';
import StatusContent from '../components/StatusContent';
import StatusImageButtonBar from '../components/StatusImageButtonBar';
import StatusAccountBar from '../components/StatusAccountBar';
import StatusCreatedAgoText from '../components/StatusCreatedAgoText';

type StatusDetailScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'StatusDetail'>,
  route: { params: { status: Status, aspectRatio: number } };
}

export const getSharedElementPreviewImageId = (status: Status) => `status-${status.id}.preview_image`;
export const getSharedElementPreviewImageConfig = (status: Status): SharedElementConfig => ({
  id: `status-${status.id}.preview_image`,
  align: 'center-center',
});

export default function StatusDetailScreen({ navigation, route }: StatusDetailScreenProps) {
  const [status, setStatus] = useState<Status>(route.params.status);

  return (
    <ScrollView>
      <Container>
        <StatusAccountBar status={status} navigation={navigation} />
        <StatusImage status={status} initialAspectRatio={route.params.aspectRatio} />
        <StatusImageButtonBar status={status} onUpdateStatus={setStatus} navigation={navigation} />
        <StatusContent status={status} />
        <StatusCreatedAgoText status={status} />
      </Container>
    </ScrollView>
  );
}
