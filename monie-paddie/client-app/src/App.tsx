import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MockPage from "./pages/mockpage/mockpage";
import SignUpPage from "./pages/signup/Signup";
import LoginPage from "./pages/login/Login";
import MockDashboard from "./pages/dummy-dashboard/Dashboard";
import Sso from "./pages/sso/Sso";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MockPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<MockDashboard />} />
        <Route path="/sso" element={<Sso />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
