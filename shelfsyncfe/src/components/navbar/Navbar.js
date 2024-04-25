import React from 'react';
import { signOut } from "firebase/auth";
import { Link} from 'react-router-dom';
import { auth } from "../../firebase";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../resources/logo.png';
import Avatar from '@mui/material/Avatar';
import './Navbar.css';

const Navbar = ({ firstNav, secondNav, thirdNav, authUser, searchBarEnabled}) => {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const userSignOut = () => {
        signOut(auth)
          .then(() => {
            console.log("Sign out successful");
          })
          .catch((error) => console.log(error));
    };

    const searchBook = () => {
        navigate("/search");
    };

    const goToHome = () => {
        navigate("/");
    };

    return (
        <nav className="navbar">
            <div className="nav-links-left">
                <img src={logo} className="logo" alt="Shelf Sync Logo" onClick={goToHome}/>
                {searchBarEnabled && (
                <div className="container">
                    <form>
                    <input type="search" placeholder="Search books..." readonly onClick={searchBook}/>
                    <button type="search_button_navbar" onClick={searchBook}>Search</button>
                    </form>
                </div>
                )}
            </div>
            <div className="nav-links-right"> 
                <div className="nav-link">
                    <Link to={firstNav.to}>{firstNav.label}</Link>
                </div>
                <div className="nav-link">
                    <Link to={secondNav.to}>{secondNav.label}</Link>
                </div>
                <div className="nav-link">
                    <Link to={thirdNav.to}>{thirdNav.label}</Link>
                </div>
                <Avatar
                  alt="Profile picture"
                  src={authUser.photoURL}
                  sx={{ width: '2.6em', height: '2.6em', marginRight: '1.6em', marginLeft: '2em', cursor: 'pointer' }}
                  onClick={toggleDropdown}
                />
                {isOpen && (
                <div className="dropdown">
                        <div className='display-name'><b>{authUser.displayName}</b></div>
                        <div className="sign-out" onClick={userSignOut}>Sign out</div>
                </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;

