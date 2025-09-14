import React from "react";
import { Button, Typography, Box, Paper } from "@mui/material";

// Worker dashboard component
const WorkerDashboard: React.FC = () => {
  // פונקציות שמטפלות בהגשת בקשה ובצפייה בבקשות
  const handleSubmitVacationRequest = () => {
    alert("Vacation request submitted!");
    // כאן תוכל להוסיף את הלוגיקה למשלוח הבקשה לשרת
  };

  const handleViewRequests = () => {
    alert("Viewing your vacation requests");
    // כאן תוכל להוסיף לוגיקה להצגת הבקשות של העובד
  };

  return (
    <Paper sx={{ padding: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome, Worker
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Manage your vacation requests and view your history.
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        {/* כפתור להגיש בקשה לחופשה */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmitVacationRequest}
          sx={{ width: '80%', padding: '10px' }}
        >
          Submit Vacation Request
        </Button>

        {/* כפתור לצפייה בבקשות של העובד */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleViewRequests}
          sx={{ width: '80%', padding: '10px' }}
        >
          View My Requests
        </Button>
      </Box>
    </Paper>
  );
};

export default WorkerDashboard;
