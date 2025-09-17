import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import ManagerDashboard from "./pages/ManagerDashboard"
import WorkerDashboard from "./pages/WorkerDashboard"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/worker" element={<WorkerDashboard />} />
      </Routes>
    </Router>
  )
}

export default App
