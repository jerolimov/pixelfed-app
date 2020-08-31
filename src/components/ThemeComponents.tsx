import React from 'react';
import { Switch as RNSwitch, Text as RNText, TextProps, View, ViewProps, SwitchProps, GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
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
  containerStyle?: StyleProp<ViewStyle>;
}

export function HTML({ html, ...props }: HTMLProps) {
  const theme = useTheme();
  const baseFontStyle = {
    color: theme.colors.text,
  };
  const tagsStyles = {
    a: { color: theme.colors.primary },
  };

  // Fix an issue with missing spaces between links (hashtags)
  // See also https://github.com/archriss/react-native-render-html/issues/261
  const fixedHtml = html.replace(/\/a>\s<a/g, '/a>&shy; <a');

  return (
    <RNRenderHTML
      html={fixedHtml}
      {...props}
      baseFontStyle={baseFontStyle}
      tagsStyles={tagsStyles}
    />
  );
}
