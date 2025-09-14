import React from "react";
import { Button, Typography, Box, Paper } from "@mui/material";

// Manager dashboard component
const ManagerDashboard: React.FC = () => {
  // פונקציות שמטפלות בהגשת בקשה ובצפייה בבקשות
  const handleApproveRequest = () => {
    alert("Vacation request approved!");
    // כאן תוכל להוסיף את הלוגיקה לאישור הבקשה
  };

  const handleDenyRequest = () => {
    alert("Vacation request denied!");
    // כאן תוכל להוסיף את הלוגיקה לדחיית הבקשה
  };

  const handleViewRequests = () => {
    alert("Viewing all vacation requests");
    // כאן תוכל להוסיף לוגיקה להצגת כל הבקשות
  };

  const handleViewCalendar = () => {
    alert("Viewing vacation calendar");
    // כאן תוכל להוסיף לוגיקה להצגת לוח החופשות
  };

  return (
    <Paper sx={{ padding: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome, Manager
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and manage vacation requests from workers.
        </Typography>
      </Box>

      {/* כפתורים לפעולות */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        {/* כפתור לאישור ודחיית בקשות */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleApproveRequest}
          sx={{ width: '80%', padding: '10px', marginBottom: 2 }}
        >
          ✅ Approve Requests
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={handleDenyRequest}
          sx={{ width: '80%', padding: '10px', marginBottom: 2 }}
        >
          ❌ Deny Requests
        </Button>

        {/* כפתור לצפייה בבקשות */}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleViewRequests}
          sx={{ width: '80%', padding: '10px', marginBottom: 2 }}
        >
          📋 View All Requests
        </Button>

        {/* כפתור לצפייה בלוח חופשות */}
        <Button
          variant="contained"
          color="warning"
          onClick={handleViewCalendar}
          sx={{ width: '80%', padding: '10px' }}
        >
          📅 View Vacation Calendar
        </Button>
      </Box>
    </Paper>
  );
};

export default ManagerDashboard;
