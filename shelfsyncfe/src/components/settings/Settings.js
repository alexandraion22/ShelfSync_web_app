import React from "react";
import useAuthState from "../auth/useAuthState";
import CombinedSettings from "./CombinedSettings";
import AdminError from "../error/AdminError";

const Settings = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'AUTHOR':
      case 'READER':
        return <CombinedSettings authUser={authUser} role={role} token={token}/>;
      case 'ADMIN':
        return <AdminError authUser={authUser}/>
      default:
        return null;
    }
};

export default Settings;