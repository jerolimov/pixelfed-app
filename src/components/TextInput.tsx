import React from 'react';
import { TextInput as RNTextInput, TextInputProps } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function TextInput({ style, ...props }: TextInputProps) {
  const theme = useTheme();
  return (
    <RNTextInput
      {...props}
      keyboardAppearance={theme.dark ? 'dark' : 'light'}
      placeholderTextColor={theme.colors.border}
      style={[{
        margin: 10,
        padding: 10,
        color: theme.colors.text,
        backgroundColor: theme.colors.card,
        borderColor: theme.colors.border,
        borderWidth: 1,
        borderRadius: 3,
      }, style]
    }
  />)
}
