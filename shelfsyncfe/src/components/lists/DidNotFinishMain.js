import React from "react";
import useAuthState from "../auth/useAuthState";
import DidNotFinishReader from "./DidNotFinishReader";

const DidNotFinishMain = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'READER':
        return <DidNotFinishReader authUser={authUser} token={token}/>;
      default:
        return null;
    }
};

export default DidNotFinishMain;