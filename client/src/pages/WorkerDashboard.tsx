import React, { useState } from "react";
import {
  Button,
  Typography,
  Box,
  Paper,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

// check date format YYYY-MM-DD
const isValidDateFormat = (dateStr: string) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(dateStr)) return false;
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date.getTime());
};

const WorkerDashboard: React.FC = () => {
  const user_id = localStorage.getItem("user_id");
  const userEmail = localStorage.getItem("userEmail") || "Worker"; // Fallback to "Worker" if email not found
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  interface VacationRequest {
    id: number;
    start_date: string;
    end_date: string;
    status: string;
  }
  // State to hold fetched vacation requests
  const [vacationRequests, setVacationRequests] = useState<VacationRequest[]>([]); // use state to hold requests
  // State to toggle display of requests
  const [showRequests, setShowRequests] = useState(false); // use state to toggle display

  // Function to handle vacation request submission
  const handleSubmitVacationRequest = async () => {
    if (!startDate || !endDate) {
      alert("Please fill in both start and end dates.");
      return;
    }

    if (!isValidDateFormat(startDate) || !isValidDateFormat(endDate)) {
      alert("Dates must be in YYYY-MM-DD format.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/vacations?user_id=${user_id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ start_date: startDate, end_date: endDate }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Vacation request submitted!");
        setStartDate("");
        setEndDate("");
      } else {
        alert("Failed to submit vacation request: " + data.detail);
      }
    } catch (error) {
      console.error("Error submitting vacation request:", error);
      alert("An error occurred while submitting vacation request.");
    }
  };
  // Function to toggle display of worker's vacation requests
  const toggleWorkerVacationRequests = async () => {
    if (showRequests) { // In case requests are currently shown and user wants to hide them.
      // if already shown → simply hide
      setShowRequests(false);
    } else {
      // if not shown → fetch from server and show
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/vacations?user_id=${user_id}`
        );
        const data = await response.json();
        if (response.ok) {
          setVacationRequests(data); // update state with fetched requests
          setShowRequests(true); // show the requests
        } else {
          alert("Failed to fetch requests: " + data.detail);
        }
      } catch (error) {
        console.error("Error fetching vacation requests:", error);
        alert("An error occurred while fetching requests.");
      }
    }
  };

return (
  <Paper sx={{ padding: 4, backgroundColor: "#f9f9f9", borderRadius: 2 }}>
    <Box
      sx={{
        display: "flex",          // turns into two columns
        justifyContent: "space-between",
        alignItems: "flex-start",
      }}
    >
      {/* left side - fro*/}
      <Box sx={{ flex: 1, marginRight: 2 }}>
        <Box sx={{ textAlign: "center", marginBottom: 3 }}>
          <Typography variant="h4" color="primary" gutterBottom>
            Welcome, {userEmail}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your vacation requests and view your history.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          {/* Vacation form */}
          <TextField
            label="Start Date (YYYY-MM-DD)"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            sx={{ width: "80%" }}
          />
          <TextField
            label="End Date (YYYY-MM-DD)"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            sx={{ width: "80%" }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmitVacationRequest}
            sx={{ width: "80%", padding: "10px" }}
          >
            Submit Vacation Request
          </Button>

          {/*Button to show requests */}
          <Button
            variant="contained"
            color="secondary"
            onClick={toggleWorkerVacationRequests}
            sx={{ width: "80%", padding: "10px" }}
          >
            {showRequests ? "Hide My Requests" : "Show My Requests"}
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
        <Box>
          <Button
          variant="contained"
          color="primary"
          onClick={() => {
            localStorage.removeItem("userEmail");
            window.location.href = "/login";
          }}
          sx={{ width: "80%", padding: "10px" }}
        >
          logout
          </Button>
        </Box>
        </Box>
      </Box>

      {/* right side - photo*/}
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <img
          src="/worker.png"
          alt="Vacation illustration"
          style={{ maxWidth: "80%", borderRadius: "10px" }}
        />
      </Box>
    </Box>
  </Paper>
);

};

export default WorkerDashboard;
