import { BrowserRouter as Router, Routes, Route } from "react-router";
import WelcomePage from "@/react-app/pages/Welcome";
import LoginPage from "@/react-app/pages/Login";
import SignupPage from "@/react-app/pages/Signup";
import DashboardPage from "@/react-app/pages/Dashboard";
import TasksPage from "@/react-app/pages/Tasks";
import TimerPage from "@/react-app/pages/Timer";
import AnalyticsPage from "@/react-app/pages/Analytics";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/timer" element={<TimerPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
      </Routes>
    </Router>
  );
}
