import React from "react";
import useAuthState from "../auth/useAuthState";
import AuthorOrReaderError from "../error/AuthorOrReaderError";
import AdminRequests from "./AdminRequests";

const Requests = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'AUTHOR':
      case 'READER':
        return <AuthorOrReaderError authUser={authUser} role={role}/>;
      case 'ADMIN':
        return <AdminRequests authUser={authUser} token={token}/>
      default:
        return null;
    }
};

export default Requests;