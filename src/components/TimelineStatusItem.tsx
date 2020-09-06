import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';

import { StackParamList } from '../routes';
import { Status } from '../api';

import StatusAccountBar from './StatusAccountBar';
import StatusContent from './StatusContent';
import StatusImageButtonBar from './StatusImageButtonBar';
import StatusCreatedAgoText from './StatusCreatedAgoText';
import StatusImage from './StatusImage';

interface TimelineStatusItemProps {
  status: Status;
  navigation: StackNavigationProp<StackParamList, 'TimelineHome'>;
  onUpdateStatus: (status: Status) => void;
}

export default function TimelineStatusItem({ status, navigation, onUpdateStatus: updateStatus }: TimelineStatusItemProps) {
  const onImagePressed = () => {
    navigation.push('StatusDetail', { status, aspectRatio: 1, animated: true });
  };

  return (
    <View style={{ paddingVertical: 5 }}>
      <StatusAccountBar status={status} navigation={navigation} />
      <TouchableOpacity onPress={onImagePressed}>
        <StatusImage status={status} initialAspectRatio={1} />
      </TouchableOpacity>
      <StatusImageButtonBar status={status} onUpdateStatus={updateStatus} navigation={navigation} />
      <StatusContent status={status} />
      <StatusCreatedAgoText status={status} />
      {/*
      <Text style={{ paddingVertical: 5 }}>{status.replies_count} replies</Text>
      */}
    </View>
  )
}
