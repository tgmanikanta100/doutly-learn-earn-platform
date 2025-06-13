
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
      teamleader: '/team-leader-dashboard',
      subjectexpert: '/subject-expert-dashboard',
      tutor: '/tutor-dashboard',
      freelancer: '/freelancer-dashboard',
      student: '/student-dashboard',
      bda: '/bda-dashboard'
    };

    const defaultRoute = dashboardRoutes[userRole] || '/student-dashboard';
    
    return (
      <Routes>
        <Route path="/" element={<Navigate to={defaultRoute} replace />} />
        <Route path="/signin" element={<Navigate to={defaultRoute} replace />} />
        
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
        
        {/* Placeholder routes for other roles */}
        <Route path="/vertical-head-dashboard" element={
          <PrivateRoute role="verticalhead">
            <div className="p-8">Vertical Head Dashboard - Coming Soon</div>
          </PrivateRoute>
        } />
        <Route path="/manager-dashboard" element={
          <PrivateRoute role="manager">
            <div className="p-8">Manager Dashboard - Coming Soon</div>
          </PrivateRoute>
        } />
        <Route path="/team-leader-dashboard" element={
          <PrivateRoute role="teamleader">
            <div className="p-8">Team Leader Dashboard - Coming Soon</div>
          </PrivateRoute>
        } />
        <Route path="/subject-expert-dashboard" element={
          <PrivateRoute role="subjectexpert">
            <div className="p-8">Subject Expert Dashboard - Coming Soon</div>
          </PrivateRoute>
        } />
        <Route path="/tutor-dashboard" element={
          <PrivateRoute role="tutor">
            <div className="p-8">Tutor Dashboard - Coming Soon</div>
          </PrivateRoute>
        } />
        <Route path="/bda-dashboard" element={
          <PrivateRoute role="bda">
            <div className="p-8">BDA Dashboard - Coming Soon</div>
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
