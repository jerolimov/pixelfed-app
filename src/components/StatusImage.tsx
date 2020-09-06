import React, { useState } from 'react';
import { Image, NativeSyntheticEvent, ImageLoadEventData } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { Status } from '../api';
import { getSharedElementPreviewImageId } from '../screens/StatusDetailScreen';

interface StatusImageProps {
  status: Status;
  aspectRatio: number;
  onAspectRatio: (aspectRatio: number) => void;
}

export default function StatusImage({ status, aspectRatio, onAspectRatio }: StatusImageProps) {
  const imageUrl = status.media_attachments?.[0]?.preview_url;

  const onImageLoaded = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    // console.log('Image loaded:', event.nativeEvent.source);
    const { width, height } = event.nativeEvent.source;
    onAspectRatio(width / height);
  };

  return (
    <SharedElement id={getSharedElementPreviewImageId(status)}>
      <Image
        source={{ uri: imageUrl }}
        resizeMode="cover"
        style={{ aspectRatio }}
        onLoad={onImageLoaded}
      />
    </SharedElement>
  );
}
