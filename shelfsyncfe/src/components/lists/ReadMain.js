import React from "react";
import useAuthState from "../auth/useAuthState";
import ReadReader from "./ReadReader";

const ReadMain = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'READER':
        return <ReadReader authUser={authUser} token={token}/>;
      default:
        return null;
    }
};

export default ReadMain;