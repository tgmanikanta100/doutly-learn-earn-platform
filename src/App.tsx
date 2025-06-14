
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import SignIn from "./pages/SignIn";
import Unauthorized from "./pages/Unauthorized";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/auth/PrivateRoute";
import AdminDashboard from "./components/dashboards/AdminDashboard";
import StudentDashboard from "./components/dashboards/StudentDashboard";
import FreelancerDashboard from "./components/dashboards/FreelancerDashboard";
import VerticalHeadDashboard from "./components/dashboards/VerticalHeadDashboard";
import ManagerDashboard from "./components/dashboards/ManagerDashboard";
import TeamLeaderDashboard from "./components/dashboards/TeamLeaderDashboard";
import SubjectExpertDashboard from "./components/dashboards/SubjectExpertDashboard";
import TutorDashboard from "./components/dashboards/TutorDashboard";
import BDADashboard from "./components/dashboards/BDADashboard";
import UserProfile from "./components/common/UserProfile";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient();

const AppRoutes = () => {
  const { user, userRole, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Redirect authenticated users to their dashboard
  if (user && userRole) {
    const dashboardRoutes = {
      admin: '/admin-dashboard',
      verticalhead: '/vertical-head-dashboard',
      manager: '/manager-dashboard',
      teamlead: '/team-leader-dashboard',
      subjectexpert: '/subject-expert-dashboard',
      tutor: '/tutor-dashboard',
      freelancer: '/freelancer-dashboard',
      student: '/student-dashboard',
      bda: '/bda-dashboard',
      sales: '/bda-dashboard'
    };

    const defaultRoute = dashboardRoutes[userRole] || '/student-dashboard';
    
    return (
      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route path="/signin" element={<Navigate to={defaultRoute} replace />} />
        <Route path="/signup" element={<Navigate to={defaultRoute} replace />} />
        
        {/* Protected Dashboard Routes */}
        <Route path="/admin-dashboard" element={
          <PrivateRoute role="admin">
            <AdminDashboard />
          </PrivateRoute>
        } />
        <Route path="/student-dashboard" element={
          <PrivateRoute role="student">
            <StudentDashboard />
          </PrivateRoute>
        } />
        <Route path="/freelancer-dashboard" element={
          <PrivateRoute role="freelancer">
            <FreelancerDashboard />
          </PrivateRoute>
        } />
        <Route path="/vertical-head-dashboard" element={
          <PrivateRoute role="verticalhead">
            <VerticalHeadDashboard />
          </PrivateRoute>
        } />
        <Route path="/manager-dashboard" element={
          <PrivateRoute role="manager">
            <ManagerDashboard />
          </PrivateRoute>
        } />
        <Route path="/team-leader-dashboard" element={
          <PrivateRoute role="teamlead">
            <TeamLeaderDashboard />
          </PrivateRoute>
        } />
        <Route path="/subject-expert-dashboard" element={
          <PrivateRoute role="subjectexpert">
            <SubjectExpertDashboard />
          </PrivateRoute>
        } />
        <Route path="/tutor-dashboard" element={
          <PrivateRoute role="tutor">
            <TutorDashboard />
          </PrivateRoute>
        } />
        <Route path="/bda-dashboard" element={
          <PrivateRoute role="bda">
            <BDADashboard />
          </PrivateRoute>
        } />

        {/* Profile Route */}
        <Route path="/profile" element={
          <PrivateRoute>
            <UserProfile />
          </PrivateRoute>
        } />
        
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }

  // Routes for non-authenticated users
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
