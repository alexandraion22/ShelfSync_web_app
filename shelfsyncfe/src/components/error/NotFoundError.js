import React from "react";
import useAuthState from "../auth/useAuthState";
import AuthorOrReaderError from "./AuthorOrReaderError";
import AdminError from "./AdminError";

const NotFoundError = () => {
    const {authUser,role} = useAuthState();
    switch (role) {
      case 'ADMIN':
        return <AdminError authUser={authUser} />;
      case 'AUTHOR':
      case 'READER':
        return <AuthorOrReaderError authUser={authUser} role={role}/>;
      default:
        return null;
    }
};

export default NotFoundError;