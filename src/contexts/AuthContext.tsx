
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export type UserRole = 'student' | 'freelancer' | 'admin' | 'verticalhead' | 'manager' | 'teamleader' | 'subjectexpert' | 'tutor';

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userRole: null,
  loading: true,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const getUserRole = (email: string): UserRole => {
  if (email.endsWith('.admin@doutly.com')) return 'admin';
  if (email.endsWith('.freelancer@doutly.com')) return 'freelancer';
  if (email.endsWith('.verticalhead@doutly.com')) return 'verticalhead';
  if (email.endsWith('.manager@doutly.com')) return 'manager';
  if (email.endsWith('.teamleader@doutly.com')) return 'teamleader';
  if (email.endsWith('.subjectexpert@doutly.com')) return 'subjectexpert';
  if (email.endsWith('.tutor@doutly.com')) return 'tutor';
  return 'student'; // Default for any other email format
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user?.email) {
        setUserRole(getUserRole(user.email));
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    user,
    userRole,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
