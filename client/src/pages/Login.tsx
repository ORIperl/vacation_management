import React from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// יצירת נושא (Theme) עם צבע כחול רויאל
const theme = createTheme({
  palette: {
    primary: {
      main: '#4169E1', // צבע כחול רויאל
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const LoginPage = () => {
  // פונקציה שתתבצע בעת לחיצה על כפתור ה-login
  const handleLogin = (event: React.FormEvent) => {
    event.preventDefault();
    alert('Login clicked!');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4', // רקע אפור בהיר
      }}
    >
      <Typography variant="h4" color="primary" sx={{ marginBottom: 2 }}>
        Login
      </Typography>
      
      <form onSubmit={handleLogin} style={{ width: '300px' }}>
        {/* שדה אימייל */}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        {/* שדה סיסמה */}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        {/* כפתור Login */}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ marginTop: 2 }}
        >
          Login
        </Button>
      </form>
    </Box>
  );
};

// עטיפה של האפליקציה ב-ThemeProvider
export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginPage />
    </ThemeProvider>
  );
}
