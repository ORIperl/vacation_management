import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// יצירת נושא עם צבע כחול רויאל
const theme = createTheme({
  palette: {
    primary: {
      main: '#4169E1', // כחול רויאל
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function Dashboard() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: '2rem',
          backgroundColor: '#fafafa', // רקע בהיר מאוד
          minHeight: '100vh', // כדי שהדף ימלא את כל הגובה
        }}
      >
        {/* כותרת ראשית */}
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome to the Dashboard
        </Typography>

        {/* פסקה */}
        <Typography variant="body1" color="textSecondary" paragraph>
          Welcome to your personal dashboard. Here you can manage your account and view important information.
        </Typography>

        {/* כפתור פשוט */}
        <Button
          variant="contained"
          color="primary"
          sx={{ marginBottom: '1.5rem', maxWidth: '200px' }}
        >
          Go to Settings
        </Button>

        {/* כרטיסים פשוטים */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                User Stats
              </Typography>
              <Typography variant="body2" color="textSecondary">
                See your user statistics here.
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ flex: 1 }}>
            <CardContent>
              <Typography variant="h6" color="primary">
                Reports
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Generate and view reports.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard;