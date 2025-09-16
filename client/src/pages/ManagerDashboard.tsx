import React, { useState } from "react";
import { Button, Typography, Box, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

// Manager dashboard component
const ManagerDashboard: React.FC = () => {
 // const user_id = localStorage.getItem("user_id");
  const userEmail = localStorage.getItem("userEmail") || "Manager"; // Fallback to "manager" if email not found
  
  interface VacationRequest {
      id: number;
      start_date: string;
      end_date: string;
      status: string;
    }
    // State to hold fetched vacation requests
    const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>([]); // use state to hold the pending requests
  // State to toggle display of requests
    const [showRequests, setShowRequests] = useState(false); // use state to toggle display


  // Functions to handle request submission and viewing
  const handleApproveRequest = () => {
    alert("Vacation request approved!");
    // Add logic for request approval here
  };

  const handleDenyRequest = () => {
    alert("Vacation request denied!");
    // Add logic for request denial here
  };

  const handleViewRequests = async () => {
    // Add logic for viewing all requests here
    if (showRequests) { //In case that requests are shown:
      setShowRequests(false);
      } else {
        try {
          const response = await fetch(
            `http://127.0.0.1:8000/api/manager/pending_vacations`,
          );
          const data = await response.json();
          if (response.ok) {
            setVacationRequests(data);
            setShowRequests(true);
          } else {
            alert("Failed to submit vacation request: " + data.detail);
          }
        } catch (error) {
          console.error("Error showing pending requests:", error);
          alert("An error occurred while askink for pending requests.");
        }
      }
    };

  const handleViewCalendar = () => {
    alert("Viewing vacation calendar");
    // Add logic for displaying vacation calendar here
  };

  return (
    <Paper sx={{ padding: 4, backgroundColor: '#f9f9f9', borderRadius: 2 }}>
      <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome, {userEmail}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and manage vacation requests from workers.
        </Typography>
      </Box>

      {/* Action buttons */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, alignItems: 'center' }}>
        {/* Approve and deny request buttons */}
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

        {/* Button to View pending requests*/}
        <Button
          variant="contained"
          color="secondary"
          onClick={handleViewRequests}
          sx={{ width: '80%', padding: '10px', marginBottom: 2 }}
        >
          {showRequests ? "Hide Pending Requests" : "Show Pending Requests"} 
        </Button>
        {showRequests && vacationRequests.length > 0 && (
          <Table sx={{ marginTop: 2, width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vacationRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.start_date}</TableCell>
                  <TableCell>{req.end_date}</TableCell>
                  <TableCell>{req.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        {/* View vacation calendar button */}
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
