import React from 'react';
import { Image } from 'react-native';

import { Account } from '../api';

export type AccountAvatarImageProps = {
  account: Account;
  size: number;
}

export default function AccountAvatarImage({ account, size }: AccountAvatarImageProps) {
  return (
    <Image
      source={{ uri: account.avatar_static }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  )
}
