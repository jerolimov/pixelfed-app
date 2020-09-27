import React from 'react';
import { ScrollView, RefreshControl, Button } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useTimelineHome, Status } from '../hooks/api';
import { StackParamList } from '../routes';
import Container from '../components/Container';
import TimelineStatusItem from '../components/TimelineStatusItem';

type HomeScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'TimelineHome'>,
}

export default function TimelineHomeScreen({ navigation }: HomeScreenProps) {
  const timelineHome = useTimelineHome();
  const statuses = (timelineHome.data || []).flat();

  const updateStatus = (status: Status) => {
    // setStatuses(statuses => statuses?.map(s => s.id === status.id ? status : s));
  };

  return (
    <ScrollView refreshControl={<RefreshControl refreshing={timelineHome.isLoading} onRefresh={timelineHome.refetch} />}>
      <Container>
        {
          statuses.map(status => (
            <TimelineStatusItem
              key={status.id}
              status={status}
              navigation={navigation}
              onUpdateStatus={updateStatus}
            />
          ))
        }
        {
          timelineHome.canFetchMore ? (
            <Button
              title="Fetch more"
              disabled={timelineHome.isFetchingMore === 'next'}
              onPress={() => timelineHome.fetchMore()}
            />
          ) : null
        }
      </Container>
    </ScrollView>
  );
}
