import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from "../../firebase";

// Get the currently logged in user and their role
const useAuthState = () => {
  const [authUser, setAuthUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
        user.getIdToken()
          .then((idToken) => { 
            setToken(idToken);
          })
        user.getIdTokenResult()
          .then((idTokenResult) => {
            setRole(idTokenResult.claims.role);
          })
        
      } else {
        setAuthUser(null);
        setRole(null);
        setToken(null)
      }
    });
    return () => listen();
  }, []);

  return {authUser,role,token};
};

export default useAuthState;
