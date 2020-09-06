import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { getTimelineHome, Status } from '../api';
import { StackParamList } from '../routes';
import Container from '../components/Container';
import TimelineStatusItem from '../components/TimelineStatusItem';

type HomeScreenProps = {
  navigation: StackNavigationProp<StackParamList, 'TimelineHome'>,
}

export default function TimelineHomeScreen({ navigation }: HomeScreenProps) {
  const [statuses, setStatuses] = useState<Status[]>();
  useEffect(() => {
    getTimelineHome().then(setStatuses, (error) => console.warn('fetch error:', error));
  }, []);

  const updateStatus = (status: Status) => {
    setStatuses(statuses => statuses?.map(s => s.id === status.id ? status : s));
  };

  return (
    <ScrollView>
      <Container>
        {
          statuses?.map(status => (
            <TimelineStatusItem
              key={status.id}
              status={status}
              navigation={navigation}
              onUpdateStatus={updateStatus}
            />
          ))
        }
      </Container>
    </ScrollView>
  );
}
