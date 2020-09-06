import React from 'react';
import { GestureResponderEvent } from 'react-native';

import { Status } from '../api';
import HTML, { HtmlAttributesDictionary } from './HTML';

interface StatusImageProps {
  status: Status;
}

export default function StatusContent({ status }: StatusImageProps) {
  const onLinkPressed = (
    _event: GestureResponderEvent,
    href: string,
    htmlAttribs: HtmlAttributesDictionary
  ) => {
    console.log('onLinkPress', href, htmlAttribs);
  };

  return (
    <HTML
      html={status.content}
      onLinkPress={onLinkPressed}
      containerStyle={{ paddingHorizontal: 10, paddingVertical: 5 }}
    />
  );
}
