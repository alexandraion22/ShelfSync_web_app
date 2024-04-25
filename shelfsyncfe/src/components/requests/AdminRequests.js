import React from "react";
import Navbar from "../navbar/Navbar";

const AdminRequests = ({authUser, token}) => {
    return (
          <div className="App">
            <Navbar firstNav={{to: "/requests", label: "Requests"}} 
                    secondNav={{to: "/accounts", label: "Accounts"}}
                    thirdNav={{to: "/feedback", label: "Feedback"}} 
                    authUser={authUser}
                    searchBarEnabled={false}/>
            <div>
              <p>{`Admin Requests: Signed in as ${authUser.email}`}</p>
            </div>
          </div>
    );
};

export default AdminRequests;