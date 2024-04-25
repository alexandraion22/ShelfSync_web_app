import React from "react";
import useAuthState from "../auth/useAuthState";
import AddBookAuthor from "./AddBookAuthor";

const AddBookMain = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'AUTHOR':
        return <AddBookAuthor authUser={authUser} token={token}/>;
      default:
        return null;
    }
};

export default AddBookMain;