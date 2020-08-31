import React from 'react';
import { useTheme } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export const FavIcon = ({ active }: { active: boolean }) => {
  const color = '#b00000';
  return (
    <MaterialIcons
        name={active ? 'favorite' : 'favorite-border'}
        size={32}
        color={color}
    />
  );
};

export const ReblogIcon = () => {
  const theme = useTheme();
  const color = theme.colors.text;
  return (
    <MaterialIcons
      name="repeat"
      size={16}
      color={color}
    />
  );
};

export const ShareIcon = () => {
  const theme = useTheme();
  const color = theme.colors.text;
  return (
    <MaterialIcons
      name="share"
      size={24}
      color={color}
    />
  );
};

export const MoreIcon = () => {
  const theme = useTheme();
  return (
    <MaterialIcons
      name="more-horiz"
      size={24}
      color={theme.colors.text}
    />
  );
}
