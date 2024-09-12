'use client';
import { createTheme } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

export default function ThemeProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
}
