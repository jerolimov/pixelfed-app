import React from 'react';
import { View, ViewProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Container({ ...props }: ViewProps & { children: React.ReactNode }) {
  const backgroundColor = useTheme().dark ? '#181818' : 'white';
  return <View {...props} style={{ backgroundColor }} />
}
