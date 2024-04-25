import React from "react";
import Navbar from "../navbar/Navbar";

const AuthorOrReaderError = ({authUser,role}) => {
    return (
          <div className="App">
            <Navbar firstNav={{to: "/", label: "My Books"}} 
                    secondNav={{to: "/settings", label: "Settings"}}
                    thirdNav={{to: "/feedback", label: "Feedback"}}
                    authUser={authUser}
                    searchBarEnabled={role === 'READER'}/>
            <div>
              <p>{`Error 404: Not found`}</p>
            </div>
          </div>
    );
};

export default AuthorOrReaderError;