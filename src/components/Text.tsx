import React from 'react';
import { Text as RNText, TextProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function Text({ style, ...props }: TextProps & { children: React.ReactNode }) {
  const theme = useTheme();
  return <RNText {...props} style={[{ color: theme.colors.text }, style]} />
}
