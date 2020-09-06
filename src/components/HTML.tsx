import React from 'react';
import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { default as RNRenderHTML, HtmlAttributesDictionary } from "react-native-render-html";

export { HtmlAttributesDictionary } from "react-native-render-html";

export interface HTMLProps {
  html: string;
  onLinkPress: (
    _event: GestureResponderEvent,
    href: string,
    htmlAttribs: HtmlAttributesDictionary
  ) => void;
  containerStyle?: StyleProp<ViewStyle>;
}

export default function HTML({ html, ...props }: HTMLProps) {
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
