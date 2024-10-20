import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCookie, deleteCookie, setCookie } from '../api/auth';
import { domain } from '../api/domain';
import { useRouter } from 'next/router';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie('token');
    setIsLoggedIn(!!token);
  }, []);

  const signOut = () => {


    deleteCookie("token");
    setIsLoggedIn(false);
    router.push('/signin');
  };

  const signIn = (token) => {
    setCookie('token', token, 7);
    setIsLoggedIn(true);
    const { redirect } = router.query;
    if (redirect) {
        router.push(redirect);
    } else {
        router.push("/");
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext easily
export const useAuth = () => {
  return useContext(AuthContext);
};

// Utility function to check if code is running in browser
const isBrowser = typeof window !== 'undefined';

// Modify these functions to be safe in both client and server environments
const safeGetCookie = (name) => {
  if (isBrowser) {
    return getCookie(name);
  }
  return null;
};

const safeSetCookie = (name, value, days) => {
  if (isBrowser) {
    setCookie(name, value, days);
  }
};

const safeDeleteCookie = (name) => {
  if (isBrowser) {
    deleteCookie(name);
  }
};
