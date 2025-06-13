
import React, { useState } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, userRole } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getDashboardRoute = () => {
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
    return userRole ? dashboardRoutes[userRole] || '/student-dashboard' : '/student-dashboard';
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Doutly
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
            <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
            <a href="#techbox" className="text-gray-600 hover:text-blue-600 transition-colors">Tech Box</a>
            <a href="#events" className="text-gray-600 hover:text-blue-600 transition-colors">Events</a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-4">
                <Button 
                  variant="outline" 
                  onClick={() => navigate(getDashboardRoute())}
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Dashboard
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={handleLogout}
                  className="text-red-600 hover:text-red-700 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </div>
            ) : (
              <>
                <Link to="/signin">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <a href="#about" className="text-gray-600 hover:text-blue-600 transition-colors">About</a>
              <a href="#services" className="text-gray-600 hover:text-blue-600 transition-colors">Services</a>
              <a href="#techbox" className="text-gray-600 hover:text-blue-600 transition-colors">Tech Box</a>
              <a href="#events" className="text-gray-600 hover:text-blue-600 transition-colors">Events</a>
              <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button 
                    variant="outline" 
                    onClick={() => navigate(getDashboardRoute())}
                    className="flex items-center gap-2"
                  >
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                  <Button 
                    variant="ghost" 
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Link to="/signin">
                    <Button variant="ghost" className="w-full">Sign In</Button>
                  </Link>
                  <Link to="/signup">
                    <Button className="w-full">Get Started</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
