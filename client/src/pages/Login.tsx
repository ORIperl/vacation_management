import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Tabs,
  Tab,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#175b0cff",
    },
  },
});

const AuthPage = () => {
  const navigate = useNavigate();

  const [tab, setTab] = useState(0); // 0 = Login, 1 = Signup
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("worker"); // for signup only

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault(); // prevent page refresh

    try {
      const response = await fetch("http://127.0.0.1:8000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("role", data.role);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("userEmail", email);

        if (data.role === "manager") navigate("/manager");
        else navigate("/worker");
      } else {
        alert("Login failed: " + data.detail);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login.");
    }
  };

  // Signup handler
  const handleSignup = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.role === "manager") navigate("/manager");
        else navigate("/worker");
      } else {
        alert("Signup failed: " + data.detail);
      }
    } catch (error) { 
      console.error("Error during signup:", error);
      alert("An error occurred during signup.");
    }
  };

return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f4f4f4",
        padding: 4
      }}
    >
      {/* left side - form*/}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#fff",
          borderRadius: 2,
          padding: 4,
          marginRight: 2,
          boxShadow: 2,
        }}
      >
        <Typography variant="h4" color="primary" sx={{ marginBottom: 2 }}>
          {tab === 0 ? "Login" : "Sign Up"}
        </Typography>

        <Tabs value={tab} onChange={handleTabChange} centered sx={{ marginBottom: 2 }}>
          <Tab label="Login" />
          <Tab label="Sign Up" />
        </Tabs>

        {/* Login Form */}
        {tab === 0 && (
          <form onSubmit={handleLogin} style={{ width: "300px" }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

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
        )}

        {/* Signup Form */}
        {tab === 1 && (
          <form onSubmit={handleSignup} style={{ width: "300px" }}>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

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

            <FormControl component="fieldset" sx={{ marginTop: 2 }}>
              <FormLabel component="legend">Role</FormLabel>
              <RadioGroup
                row
                value={role}
                onChange={(e) => setRole(e.target.value)}
                aria-label="role"
                name="role"
              >
                <FormControlLabel
                  value="worker"
                  control={<Radio />}
                  label="Worker"
                />
                <FormControlLabel
                  value="manager"
                  control={<Radio />}
                  label="Manager"
                />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Sign Up
            </Button>
          </form>
        )}
      </Box>

      {/* right side - photo*/}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          mt: -20
        }}
      >
        <img
          src="/vacation.png" 
          alt="Authentication illustration"
          style={{ maxWidth: "100%", borderRadius: "12px" }}
        />
      </Box>
    </Box>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <AuthPage />
    </ThemeProvider>
  );
}