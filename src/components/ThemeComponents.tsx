import React from 'react';
import { Switch as RNSwitch, Text as RNText, TextProps, View, ViewProps, SwitchProps, GestureResponderEvent } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { default as RNRenderHTML, HtmlAttributesDictionary } from "react-native-render-html";

export { HtmlAttributesDictionary } from "react-native-render-html";

export function Container({ style, ...props }: ViewProps & { children: React.ReactNode }) {
  const backgroundColor = useTheme().dark ? '#181818' : 'white';
  return <View {...props} style={[{ backgroundColor }, style]} />
}

export function Text({ style, ...props }: TextProps & { children: React.ReactNode }) {
  const theme = useTheme();
  return <RNText {...props} style={[{ color: theme.colors.text }, style]} />
}

export function Switch(props: SwitchProps) {
  return <RNSwitch {...props} />
}

export interface HTMLProps {
  html: string;
  onLinkPress: (
    _event: GestureResponderEvent,
    href: string,
    htmlAttribs: HtmlAttributesDictionary
  ) => void;
}

export function HTML(props: HTMLProps) {
  const theme = useTheme();
  const tagsStyles = {
    a: { color: theme.colors.primary },
  };
  return <RNRenderHTML {...props} tagsStyles={tagsStyles} />
}
