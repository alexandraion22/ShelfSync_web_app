import React from "react";
import useAuthState from "../auth/useAuthState";
import AuthorOrReaderError from "../error/AuthorOrReaderError";
import AdminAccounts from "./AdminAccounts";

const Accounts = () => {
    const {authUser,role} = useAuthState();
    switch (role) {
      case 'AUTHOR':
      case 'READER':
        return <AuthorOrReaderError authUser={authUser} role={role}/>;
      case 'ADMIN':
        return <AdminAccounts authUser={authUser}/>
      default:
        return null;
    }
};

export default Accounts;