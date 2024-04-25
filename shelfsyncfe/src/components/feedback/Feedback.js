import React from "react";
import useAuthState from "../auth/useAuthState";
import AdminFeedback from "./AdminFeedback";
import SendFeedback from "./SendFeedback";

const Feedback = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'ADMIN':
        return <AdminFeedback authUser={authUser} token={token}/>;
      case 'AUTHOR':
      case 'READER':
        return <SendFeedback authUser={authUser} role={role} token={token}/>;
      default:
        return null;
    }
};

export default Feedback;