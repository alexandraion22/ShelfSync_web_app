import React from "react";
import useAuthState from "../auth/useAuthState";
import AuthorHome from "./AuthorHome";
import ReaderHome from "./ReaderHome";
import AdminFeedback from "../feedback/AdminFeedback";

const Home = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'ADMIN':
        return <AdminFeedback authUser={authUser} token ={token}/>;
      case 'AUTHOR':
        return <AuthorHome authUser={authUser} token={token}/>;
      case 'READER':
        return <ReaderHome authUser={authUser} token={token}/>;
      default:
        return null;
    }
};

export default Home;