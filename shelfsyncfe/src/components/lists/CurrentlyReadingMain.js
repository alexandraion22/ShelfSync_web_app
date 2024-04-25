import React from "react";
import useAuthState from "../auth/useAuthState";
import CurrentlyReadingReader from "./CurrentlyReadingReader";

const CurrentlyReadingMain = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'READER':
        return <CurrentlyReadingReader authUser={authUser} token={token}/>;
      default:
        return null;
    }
};

export default CurrentlyReadingMain;