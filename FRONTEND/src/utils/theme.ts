import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#2a5c45',
      dark: '#1e4332',
    },
    background: {
      default: '#f5f4ef',
      paper: '#ffffff',
    },
    text: {
      primary: '#1a1a18',
      secondary: '#6b6b66',
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    h1: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
    h2: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
    h3: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
    h4: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
    h5: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
    h6: { fontFamily: '"DM Serif Display", serif', fontWeight: 400 },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 500,
          borderRadius: '6px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
        contained: {
          backgroundColor: '#2a5c45',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#1e4332',
          },
        },
        outlined: {
          borderColor: 'rgba(26,26,24,0.1)',
          color: '#1a1a18',
          '&:hover': {
            backgroundColor: 'rgba(26,26,24,0.05)',
            borderColor: 'rgba(26,26,24,0.2)',
          },
        },
      },
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: '6px',
            '&.Mui-focused fieldset': {
              borderColor: '#2a5c45',
            },
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '10px',
          boxShadow: 'none',
          border: '1px solid rgba(26,26,24,0.1)',
        },
      },
    },
    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: '#2a5c45',
        },
      },
    },
  },
});