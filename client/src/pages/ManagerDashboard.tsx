import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";

const ManagerDashboard: React.FC = () => {
  const userEmail = localStorage.getItem("userEmail") || "Manager";

  interface VacationRequest {
    id: number;
    start_date: string;
    end_date: string;
    status: string;
  }

  interface CalendarEntry {
    user_name: string;
    start_date: string;
    end_date: string;
  }

  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>([]);
  const [showRequests, setShowRequests] = useState(false);
  const [calendarData, setCalendarData] = useState<CalendarEntry[]>([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Function to handle approving or denying a request
  const handleApproveRequest = async (requestId: number, isApproved: string) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/manager/vacations/${requestId}/status?status=${isApproved}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
  } catch (error) {
      console.error("Error approving request:", error);
    }
    // After approving/denying, refresh the list
    const res = await fetch(`http://127.0.0.1:8000/api/manager/pending_vacations`);//get updated list
    const data = await res.json();// get json 
    if (res.ok) setVacationRequests(data);// update state with new list
  } 
  // Function to fetch and toggle display of pending vacation requests
  const handleViewRequests = async () => {
    if (showRequests) {
      setShowRequests(false);
    } else { // showRequests is false, so fetch and show
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/manager/pending_vacations`);
        const data = await response.json();
        if (response.ok) {
          setVacationRequests(data);
          setShowRequests(true);
        
        } else {
          alert("Failed to fetch pending requests: " + data.detail );
        }
      } catch (error) {
        console.error("Error fetching pending requests:", error);
        alert("An error occurred while fetching pending requests.");
      }
    }
  };

  const handleFetchCalendar = async () => {
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/manager/calendar?start_date=${startDate}&end_date=${endDate}`
      );
      const data = await response.json();
      if (response.ok) {
        setCalendarData(data); // update state with fetched calendar data
      } else {
        alert("Failed to fetch calendar data: " + data.detail);
      }
    } catch (error) {
      console.error("Error fetching calendar data:", error);
      alert("An error occurred while fetching calendar data.");
    }
  };

  // Main render
  return (
    <Paper sx={{ padding: 4, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
      <Box sx={{ textAlign: "center", marginBottom: 3 }}>
        <Typography variant="h4" color="primary" gutterBottom>
          Welcome, {userEmail}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Review and manage vacation requests from workers.
        </Typography>
      </Box>


      <Box sx={{ display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>

        {/* View Requests Button */}
        <Button variant="contained" color="secondary" onClick={handleViewRequests} sx={{ width: "80%", padding: "10px" }}>
          {showRequests ? "Hide Pending Requests" : "Show Pending Requests"}
        </Button>

        {showRequests && vacationRequests.length > 0 && (
          <Table sx={{ marginTop: 2, width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Request ID</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Approve Request ✅</TableCell>
                <TableCell>Deny Request❌</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/*For each pending request, we will add an accept or deny button */}
              {vacationRequests.map((req) => (
                <TableRow key={req.id}>
                  <TableCell>{req.id}</TableCell>
                  <TableCell>{req.start_date}</TableCell>
                  <TableCell>{req.end_date}</TableCell>
                  <TableCell>{req.status}</TableCell>
                  <TableCell>
                  <Box sx={{ display: "inline", flexDirection: "column", alignItems: "center" }}/>
                  <Button variant="contained" color="primary" onClick={() =>handleApproveRequest(req.id, "approved")} sx={{ width: "50%", padding: "10px" }}>
                    ✅
                  </Button>
                  </TableCell>
                  <TableCell>
                  <Box sx={{ display: "inline", flexDirection: "column", alignItems: "center" }}/>
                  <Button variant="contained" color="primary" onClick={() =>handleApproveRequest(req.id, "denied")} sx={{ width: "50%", padding: "10px" }}>
                    ❌
                  </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* dates chooose - Fetch Calendar */}
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, width: "80%", marginTop: 2 }}>
          <TextField
            label="Start Date (YYYY-MM-DD)"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            label="End Date (YYYY-MM-DD)"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <Button variant="contained" color="warning" onClick={handleFetchCalendar}>
            📅 Show Vacations Calendar
          </Button>
        </Box>

        {calendarData.length > 0 && (
          <Table sx={{ marginTop: 2, width: "100%" }}>
            <TableHead>
              <TableRow>
                <TableCell>Worker Email</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {calendarData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.user_name}</TableCell>
                  <TableCell>{entry.start_date}</TableCell>
                  <TableCell>{entry.end_date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Box>
    </Paper>
  );
};

export default ManagerDashboard;
