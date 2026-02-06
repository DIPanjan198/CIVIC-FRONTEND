import { Routes, Route } from "react-router-dom";

/* 🌐 INTRO */
import IntroLayout from "./pages/intro/IntroLayout";

/* 🔐 AUTH */
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

/* 👤 USER */
import UserDashboard from "./pages/UserDashboard";
import UserProfile from "./pages/UserProfile";
import CreateIssue from "./pages/CreateIssue";
import IssueDetails from "./pages/IssueDetails";

/* 🛠️ ADMIN */
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminAnalytics from "./pages/AdminAnalytics";
import AdminReports from "./pages/AdminReports";
import AdminSettings from "./pages/AdminSettings";
import Help from "./pages/Help";

/* 🔒 PROTECTION */
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Routes>
      
      {/* 🌐 LANDING PAGE */}
      <Route path="/" element={<IntroLayout />} />
    

      {/* 🔐 AUTH */}
      <Route path="/login" element={<Auth />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      {/* 👤 USER */}
      <Route
        path="/user"
        element={
          <ProtectedRoute role="user">
            <UserDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/help"
  element={
    <ProtectedRoute role="user">
      <Help />
    </ProtectedRoute>
  }
/>


      <Route
        path="/user/profile"
        element={
          <ProtectedRoute role="user">
            <UserProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/create"
        element={
          <ProtectedRoute role="user">
            <CreateIssue />
          </ProtectedRoute>
        }
      />

      <Route
        path="/issues/:id"
        element={
          <ProtectedRoute role="user">
            <IssueDetails />
          </ProtectedRoute>
        }
      />

      {/* 🛠️ ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="analytics" element={<AdminAnalytics />} />
        <Route path="reports" element={<AdminReports />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>
    </Routes>
  );
}

export default App;
