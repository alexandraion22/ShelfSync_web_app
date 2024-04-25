import React from "react";
import Navbar from "../navbar/Navbar";

const AdminError = ({authUser}) => {
    return (
          <div className="App">
            <Navbar firstNav={{to: "/requests", label: "Requests"}} 
                    secondNav={{to: "/accounts", label: "Accounts"}}
                    thirdNav={{to: "/feedback", label: "Feedback"}} 
                    authUser={authUser}
                    searchBarEnabled={false}/>
            <div>
              <p>{`Error 404: Not found`}</p>
            </div>
          </div>
    );
};

export default AdminError;