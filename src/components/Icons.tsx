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

export const ReblogIcon = ({ enabled }: { enabled: boolean }) => {
  const theme = useTheme();
  const color = theme.colors.primary;
  return (
    <MaterialIcons
      name="repeat"
      size={32}
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
      size={32}
      color={color}
    />
  );
};
