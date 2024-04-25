import React, { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar";
import Stack from '@mui/material/Stack';
import { Box } from "@mui/material";
import Typography from '@material-ui/core/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';
import { auth } from "../../firebase";
import {
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const CombinedSettings = ({ authUser, role, token }) => {
  const names = authUser.displayName.split(" ");
  const [firstName, setFirstName] = useState(names[0]);
  const [lastName, setLastName] = useState(names[1]);
  const [bio, setBio] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [photoUrl, setPhotoUrl] = useState(authUser.photoURL);
  const [error, setError] = useState(false); // State to track error
  const [errorMessage, setErrorMessage] = useState(""); 
  const [oldPasswordError, setOldPasswordError] = useState(false); // State to track error
  const [oldPasswordErrorMessage, setOldPasswordErrorMessage] = useState(""); 
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);


  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  const updateDetails = () => {
    axios.put("http://localhost:8082/users/updateUserDetails", { uid: authUser.uid, firstName: firstName, lastName: lastName, description: bio, photoUrl: photoUrl }, config)
      .then((result) => {
        console.log(result);
        console.log("Result body is", result.data);
        console.log("Result status is", result.status);
        // TODO: Add mesaj de succes
      })
      .catch(error => {
        if (error.response)
          console.log("Error is", error.response.data);
      });
  };

  const changePassword = () => {
    if (newPassword !== confirmPassword) {
      setError(true);
      setErrorMessage("Passwords don't match.")
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");

      console.log("Passwords don't match!");
      return;
    }

    // Reauthenticate the user before changing the password
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(
      user.email,
      oldPassword
    );

    reauthenticateWithCredential(user, credential)
    .then(() => {
      // If reauthentication is successful, update the password
      updatePassword(user, newPassword);
    })
    .then(() => {
      // Password update successful.
      console.log("Password updated successfully");
    })
    .catch((error) => {
      // Handle errors, e.g., wrong old password, etc.
      console.log("Error updating password:", error.message);
      setOldPasswordError(true);
      setOldPasswordErrorMessage("Wrong password.");
    });
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setError(false);
    setOldPasswordError(false);
  }

  // Automatic call to get description
  useEffect(() => {
    axios.get(`http://localhost:8082/users/getUserDetails?uid=${authUser.uid}`, config)
      .then((result) => {
        setBio(result.data);
      })
      .catch(error => {
        if (error.response)
          console.log("Error is", error.response.data);
      });
  }, []);


  return (
    <div className="App">
      <Navbar firstNav={{ to: "/", label: "My Books" }}
        secondNav={{ to: "/settings", label: "Settings" }}
        thirdNav={{ to: "/feedback", label: "Feedback" }}
        authUser={authUser}
        searchBarEnabled={role === 'READER'} />

      <div className="settings">
        <Box sx={{ paddingX: 2, margin: '8 auto', maxWidth: 900, marginLeft: 20, marginTop: 2 }}>
          <Stack direction="row" spacing={16}>
            <Box sx={{ flexGrow: 1 }}>
              <Stack direction="column" spacing={1}>
                <Typography variant="header1" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  Change Displayed Details

                </Typography>

                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  First Name
                </Typography>
                <TextField id="outlined-controlled"
                  fullWidth
                  size="small"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  variant="outlined"
                  style={{ backgroundColor: '#F6F8FA' }}
                />

                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  Last Name
                </Typography>
                <TextField id="outlined-controlled"
                  fullWidth
                  size="small"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  variant="outlined"
                  style={{ backgroundColor: '#F6F8FA' }}
                />

                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  Bio
                </Typography>
                <TextField id="outlined-controlled"
                  fullWidth
                  size="small"
                  multiline
                  rows={3}
                  value={bio}
                  placeholder="Tell us a little about yourself"
                  onChange={(e) => setBio(e.target.value)}
                  variant="outlined"
                  style={{ backgroundColor: '#F6F8FA' }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                  <Button variant="contained" style={{ backgroundColor: '#60A494', textTransform: 'none', borderRadius: 8 }} onClick={updateDetails}>
                    Update Profile
                  </Button>
                </div>

                <Typography variant="header1" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                  Change Password
                </Typography>

                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  Old Password
                </Typography>
                <OutlinedInput id="outlined-controlled"
                  fullWidth
                  size="small"
                  type={showOldPassword? "text" : "password"}
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  error={oldPasswordError}
                  helperText={oldPasswordError && oldPasswordErrorMessage}
                  variant="outlined"
                  style={{ backgroundColor: '#F6F8FA' }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowOldPassword}
                        edge="end"
                      >
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  New Password
                </Typography>
                <OutlinedInput id="outlined-controlled"
                  fullWidth
                  size="small"
                  type={showNewPassword? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  error={error} 
                  helperText={error && errorMessage}
                  variant="outlined"
                  style={{ backgroundColor: '#F6F8FA' }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowNewPassword}
                        edge="end"
                      >
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <Typography variant="body1" style={{ fontWeight: 'bold' }}>
                  Confirm New Password
                </Typography>
                <OutlinedInput id="outlined-controlled"
                  fullWidth
                  size="small"
                  type={showConfirmPassword? "text" : "password"}
                  value={confirmPassword}
                  error={error}
                  helperText={error && errorMessage}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  style={{ backgroundColor: '#F6F8FA' }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />

                <div style={{ display: 'flex', justifyContent: 'flex-start', marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                  <Button variant="contained"
                   style={{ backgroundColor: '#60A494', color: '#ffffff', textTransform: 'none', borderRadius: 8 }} 
                   onClick={changePassword}
                   disabled={oldPassword === "" || newPassword === "" || confirmPassword === ""}>
                    Change Password
                  </Button>
                </div>
              </Stack>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction="column" spacing={0.8}>
                <Typography variant="header1" align="left" style={{ fontWeight: 'bold', marginTop: 22 }}>
                  Profile picture
                </Typography>
                <Avatar
                  alt="Profile picture"
                  src={authUser.photoURL}
                  sx={{ width: '12em', height: '12em' }}
                />
                <TextField id="outlined-controlled"
                  fullWidth
                  size="small"
                  value={photoUrl}
                  placeholder="Photo URL"
                  onChange={(e) => setPhotoUrl(e.target.value)}
                  variant="outlined"
                  style={{ backgroundColor: '#F6F8FA', marginTop: -10 }}
                />
              </Stack>
            </Box>

          </Stack>
        </Box>
      </div>
    </div>
  );
};

export default CombinedSettings;