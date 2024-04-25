import React from "react";
import useAuthState from "../auth/useAuthState";
import SearchBookReader from "./SearchBookReader";

const SearchBookMain = () => {
    const {authUser,role,token} = useAuthState();
    switch (role) {
      case 'READER':
        return <SearchBookReader authUser={authUser} token={token}/>;
      default:
        return null;
    }
};

export default SearchBookMain;