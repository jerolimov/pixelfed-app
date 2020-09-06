import React, { useState, useEffect } from 'react';
import { Dimensions, Image, TouchableOpacity, View, LayoutChangeEvent, ImageLoadEventData, NativeSyntheticEvent } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { SharedElement } from 'react-navigation-shared-element';

import { Account, Status, getAccountStatuses } from '../api';
import { StackParamList } from '../routes';
import { getSharedElementPreviewImageId } from '../screens/StatusDetailScreen';

export type AccountStatusGridProps = {
  account: Account;
  navigation: StackNavigationProp<StackParamList, any>;
}

export default function AccountStatusGrid({ account, navigation }: AccountStatusGridProps) {
  const [statuses, setStatuses] = useState<Status[]>();
  useEffect(() => {
    getAccountStatuses(account).then(setStatuses, (error) => console.warn('fetch error:', error));
  }, [account.id]);

  const [width, setWidth] = useState(Dimensions.get('window').width);

  const minImageWidth = 110;
  const padding = 10;
  const columnCount = Math.floor((width - padding) / minImageWidth);
  const imageSize = (width - padding) / columnCount;

  const updateLayout = (event: LayoutChangeEvent) => {
    const windowWidth = event.nativeEvent.layout.width;
    if (width !== windowWidth) {
      setWidth(width);
    }
  };

  return (
    <View onLayout={updateLayout} style={{ flexDirection: 'row', flexWrap: 'wrap', padding: 5 }}>
      {
        statuses?.map(status => (
          <QuadraticStatusItem
            key={status.id}
            size={imageSize}
            status={status}
            navigation={navigation}
          />
        ))
      }
    </View>
  )
}

interface QuadraticStatusItemProps {
  size: number;
  status: Status;
  navigation: StackNavigationProp<StackParamList, any>;
}

function QuadraticStatusItem({ size, status, navigation }: QuadraticStatusItemProps) {
  const [aspectRatio, setAspectRatio] = useState(1);
  const imageUrl = status.media_attachments?.[0]?.preview_url;

  const onImageLoaded = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    // console.log('Image loaded:', event.nativeEvent.source);
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
  };

  return (
    <TouchableOpacity
      onPress={() => navigation.push('StatusDetail', { status, aspectRatio })}
      style={{ width: size }}
    >
      <SharedElement id={getSharedElementPreviewImageId(status)}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode="cover"
          style={{ width: size - 10, height: size - 10, margin: 5 }}
          onLoad={onImageLoaded}
        />
      </SharedElement>        
    </TouchableOpacity>
  )
}
