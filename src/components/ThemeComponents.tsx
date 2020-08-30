import React from 'react';
import { Switch as RNSwitch, Text as RNText, TextProps, View, ViewProps, SwitchProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

export function Container({ style, ...props }: ViewProps & { children: React.ReactNode }) {
  const backgroundColor = useTheme().dark ? 'black' : 'white';
  return <View {...props} style={[{ backgroundColor }, style]} />
}

export function Text({ style, ...props }: TextProps & { children: React.ReactNode }) {
  const theme = useTheme();
  return <RNText {...props} style={[{ color: theme.colors.text }, style]} />
}

export function Switch(props: SwitchProps) {
  return <RNSwitch {...props} />
}
