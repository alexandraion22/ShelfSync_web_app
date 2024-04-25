import React from "react";
import useAuthState from "../auth/useAuthState";
import { useParams } from 'react-router-dom';
import EditBookAuthor from "./EditBookAuthor";

const EditBookMain = (props) => {
    const { bookId } = useParams();
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'AUTHOR':
        return <EditBookAuthor authUser={authUser} bookId={bookId} token={token}/>;
      default:
        return null;
    }
};

export default EditBookMain;