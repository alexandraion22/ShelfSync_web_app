import React from "react";
import { Navigate } from "react-router-dom";
import useAuthState from "./useAuthState";
import { useState, useEffect } from "react";

function PrivateRoute({ children }: { children: React.JSX.Element }) {
    const { authUser } = useAuthState();
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
      if (authUser !== null) {
        setLoading(false);
      }
    }, [authUser]);
    
    useEffect(() => {
      const timeoutId = setTimeout(() => {
        setLoading(false);
      }, 4000); // TImout of 4 seconds
    
      return () => clearTimeout(timeoutId);
    }, []);
    
    if (loading) {
      return <div>Loading...</div>; //TODO: Add Loading page
    }
    
    // If authUser is null, navigate to the Login page
    if (!authUser) {
      return <Navigate to="/start" replace />;
    }
    
    // Render children if authUser is available
    return children;
  }

export default PrivateRoute;