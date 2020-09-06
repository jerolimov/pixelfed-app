import React, { useState } from 'react';
import { Image, NativeSyntheticEvent, ImageLoadEventData } from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import { Status } from '../api';
import { getSharedElementPreviewImageId } from '../screens/StatusDetailScreen';

interface StatusImageProps {
  status: Status;
  initialAspectRatio: number;
}

export default function StatusImage({ status, initialAspectRatio }: StatusImageProps) {
  const [aspectRatio, setAspectRatio] = useState(initialAspectRatio || 1);

  const imageUrl = status.media_attachments?.[0]?.preview_url;

  const onImageLoaded = (event: NativeSyntheticEvent<ImageLoadEventData>) => {
    // console.log('Image loaded:', event.nativeEvent.source);
    const { width, height } = event.nativeEvent.source;
    setAspectRatio(width / height);
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
