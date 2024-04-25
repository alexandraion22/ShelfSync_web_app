import React from "react";
import useAuthState from "../auth/useAuthState";
import WantToReadReader from "./WantToReadReader";

const WantToReadMain = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'READER':
        return <WantToReadReader authUser={authUser} token={token}/>;
      default:
        return null;
    }
};

export default WantToReadMain;