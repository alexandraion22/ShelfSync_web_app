import React from "react";
import useAuthState from "../auth/useAuthState";
import AuthorViewBook from "./AuthorViewBook";
import ReaderViewBook from "./ReaderViewBook";
import { useParams } from 'react-router-dom';

const ViewBookMain = (props) => {
    const { bookId } = useParams();
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'AUTHOR':
        return <AuthorViewBook authUser={authUser} bookId={bookId} token={token}/>;
      case 'READER':
        return <ReaderViewBook authUser={authUser} bookId={bookId} token={token}/>
      default:
        return null;
    }
};

export default ViewBookMain;