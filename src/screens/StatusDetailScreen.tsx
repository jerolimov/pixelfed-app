import React, { useState } from 'react';
import { ScrollView, RefreshControl, } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SharedElementConfig } from 'react-navigation-shared-element';

import { Status, useStatus } from '../hooks/api';
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
  const [aspectRatio, setAspectRatio] = useState(route.params.aspectRatio || 1);
  const statusResult = useStatus(route.params.status);
  const status = statusResult.data || route.params.status;

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={statusResult.isLoading} onRefresh={statusResult.refetch} />}>
      <Container>
        <StatusAccountBar status={status} navigation={navigation} />
        <StatusImage status={status} aspectRatio={aspectRatio} onAspectRatio={setAspectRatio} />
        <StatusImageButtonBar status={status} navigation={navigation} />
        <StatusContent status={status} />
        <StatusCreatedAgoText status={status} />
      </Container>
    </ScrollView>
  );
}
