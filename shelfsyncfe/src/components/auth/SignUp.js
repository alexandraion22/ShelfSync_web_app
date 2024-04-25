import React, { useState } from "react";
import logo from '../../resources/logo.png';
import { Box, Button, Stack, Typography, Paper, TextField, InputAdornment, OutlinedInput, IconButton, Collapse, Alert, MenuItem} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

const SignUp = () =>  {
    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [openFail, setOpenFail] = useState(false);
    const [openSuccess, setOpenSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessageFirst, setSuccessMessageFirst] = useState("");
    const [successMessageSecond, setSuccessMessageSecond] = useState("");
    const [role, setRole] = useState('READER');

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);
    
    const signUp = () => {

        setOpenFail(false);
        setOpenSuccess(false);
        // Verificare campuri
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match");
            setOpenFail(true);
            return;
        }

        if(password.length<6){
            setErrorMessage("Password must be at least 6 characters");
            setOpenFail(true);
            return;
        }

        if(firstName==="" ||lastName==="" ){
            setErrorMessage("Name fields should not be empty");
            setOpenFail(true);
            return;
        }

        if(email===""){
            setErrorMessage("Email should not be empty");
            setOpenFail(true);
            return;
        }

        axios.post("http://localhost:8082/users/createUser",
            { userRole: role, firstName: firstName, lastName:lastName, email:email, password:password, photoUrl: "https://thebenclark.files.wordpress.com/2014/03/facebook-default-no-profile-pic.jpg"})
            .then((result) => {
                if(result.status === 201){
                    setOpenFail(false);
                    // Mesaj confirmare
                    if(role === 'AUTHOR'){
                        setSuccessMessageFirst('Author account creation request sent!');
                        setSuccessMessageSecond('Verification can take up to 5 working days.')
                    }
                    else
                        {
                            setSuccessMessageFirst('New account added to ShelfSync!')
                            setSuccessMessageSecond('May you enjoy all your reading adventures.')
                        }
                    setOpenSuccess(true);
                    
                    // Reset fields
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setFirstName("");
                    setLastName("");
                }
            })
            .catch(error => {
                if (error.response){
                    setErrorMessage(error.response.data);
                    setOpenFail(true);
                }
            });
    };

    const rolesOptions = [
        { value: 'AUTHOR', label: 'Author' },
        { value: 'READER', label: 'Reader' },
      ];

    return(
    <div className="App">
        <Box sx={{ maxWidth: '88%', maxHeight: '70%', marginTop: '2%', marginLeft:'4%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="row" spacing={28} sx={{ height: '100%', alignItems: 'center' }}>
                <Paper variant="elevation" square={false} sx={{ backgroundColor: '#eeeeee', paddingX:5, paddingY:1.5, textAlign: 'left', borderRadius: 10, minWidth: '40%', height: '70%', maxWidth:'40%'}}>
                  <Stack spacing={0.5} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left'}}>
                        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"></link>
                        <Typography align="center" style={{fontSize: '150%', fontFamily: 'Poppins'}}>Create an account</Typography>
                        <Typography align="left" style={{fontWeight:'bold', fontFamily: 'Poppins'}}>Role</Typography>
                        <TextField
                            select
                            size="small"
                            defaultValue={role}
                            onChange={(e) => setRole(e.target.value)}
                            InputProps={{
                            style: {
                                backgroundColor: '#FFFFFF',
                            }
                            }}
                        >
                            {rolesOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                            ))}
                        </TextField>
                        <Typography align="left" style={{fontWeight:'bold', fontFamily: 'Poppins'}}>Email</Typography>
                        <TextField id="outlined-controlled"
                            fullWidth
                            size="small"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            variant="outlined"
                            style={{ backgroundColor: '#FFFFFF'}}
                        />
                        <Typography align="left" style={{fontWeight:'bold', fontFamily: 'Poppins'}}>First Name</Typography>
                        <TextField id="outlined-controlled"
                            fullWidth
                            size="small"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            variant="outlined"
                            style={{ backgroundColor: '#FFFFFF'}}
                        />

                        <Typography align="left" style={{fontWeight:'bold', fontFamily: 'Poppins'}}>Last Name</Typography>
                        <TextField id="outlined-controlled"
                            fullWidth
                            size="small"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            variant="outlined"
                            style={{ backgroundColor: '#FFFFFF'}}
                        />

                        <Typography align="left" style={{fontWeight:'bold', fontFamily: 'Poppins'}}>Password</Typography>
                        <OutlinedInput
                            fullWidth
                            size="small"
                            variant="outlined"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={{ backgroundColor: '#FFFFFF'}}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                        />
                        <Typography align="left" style={{fontWeight:'bold', fontFamily: 'Poppins'}}>Confirm Password</Typography>
                        <OutlinedInput
                            fullWidth
                            size="small"
                            variant="outlined"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            style={{ backgroundColor: '#FFFFFF'}}
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
                        <Collapse in={openFail}>
                            <Alert severity="warning" sx={{marginTop: 0.5, maxWidth: '100%'}}>
                            {errorMessage}
                            </Alert>
                        </Collapse>
                        <Collapse in={openSuccess}>
                            <Alert severity="success" sx={{marginTop: 0.5, maxWidth: '100%'}}>
                                {successMessageFirst}<br/>
                                {successMessageSecond}<br/>
                            </Alert>
                        </Collapse>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop:10, marginBottom:10}}>
                            <Button variant='contained' size='medium' style={{fontSize: 16, width: '40%', fontFamily: 'Poppins', backgroundColor: "#FF9774", color: "white", textTransform: 'none', borderRadius: 15}} onClick={signUp} >Sign Up</Button>
                        </div>
                        <div size='large' style={{fontSize: 14, fontFamily: 'Poppins', display: 'flex', justifyContent: 'center'}}>
                            Already have an account?    
                            <a href="/login"> Login </a>
                        </div>
                    </Stack>
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img src={logo} alt='logo' />
                </Box>
            </Stack>
        </Box>
    </div>
    );
}

export default SignUp;