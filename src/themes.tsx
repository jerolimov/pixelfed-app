import { DefaultTheme as DefaultLightTheme, DarkTheme as DefaultDarkTheme } from '@react-navigation/native';

export const LightTheme = {
  ...DefaultLightTheme,
  colors: {
    ...DefaultLightTheme.colors,
    primary: 'orange',
  },
};

export const DarkTheme = {
  ...DefaultDarkTheme,
  colors: {
    ...DefaultDarkTheme.colors,
    primary: 'orange',
    background: '#222222',
    card: '#181818',
    text: 'white',
    border: '#555555',
  },
};
