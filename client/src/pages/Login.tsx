import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

// create the theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#175b0cff',
    },
    
  },
});

const LoginPage = () => {
  // Get navigate function from React Router
  const navigate = useNavigate();

  // State to track user type (worker or manager)
  const [userType, setUserType] = useState<string>('worker');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  // function that happens after pressing login
  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    // Data to be sent to the server
    const loginData = {
      email: email,
      password: password,
      userType: userType,  // Sending the user type as well
    };

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 
        },
        body: JSON.stringify(loginData), // Convert data to JSON string
      });

      const data = await response.json();
      
      if (response.ok) {
        // Handle success (you can redirect the user or show a message)
        alert('Login successful!');
        console.log(data);  // Print server response

         // Navigate to different routes based on user type
        if (userType === 'manager') {
          navigate('/manager');
        } else if (userType === 'worker') {
          navigate('/worker');
        }
      } else {
        // Handle error
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred during login.');
    }
  };

  const handleUserTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserType((event.target as HTMLInputElement).value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
      }}
    >
      <Typography variant="h4" color="primary" sx={{ marginBottom: 2 }}>
        Login Page
      </Typography>

      <form onSubmit={handleLogin} style={{ width: '300px' }}>
        {/* Email field*/}
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* password field*/}
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* User Type Selection (Worker/Manager) */}
        <FormControl component="fieldset" sx={{ marginTop: 2 }}>
          <FormLabel component="legend">User Type</FormLabel>
          <RadioGroup
            row
            value={userType}
            onChange={handleUserTypeChange}
            aria-label="user type"
            name="user-type"
          >
            <FormControlLabel value="worker" control={<Radio />} label="Worker" />
            <FormControlLabel value="manager" control={<Radio />} label="Manager" />
          </RadioGroup>
        </FormControl>

        {/* Login button */}
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

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginPage />
    </ThemeProvider>
  );
}
