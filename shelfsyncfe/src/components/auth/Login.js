import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from 'react-router-dom';
import logo from '../../resources/logo.png';
import { Box, Button, Stack, Typography, Paper, TextField, InputAdornment, OutlinedInput, IconButton, Collapse, Alert} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () =>  {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [openFail, setOpenFail] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const signIn = () => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setOpenFail(true);
        });
    };

    return(
    <div className="App">
        <Box sx={{ maxWidth: '88%', maxHeight: '70%', marginTop: '5%', marginLeft:'4%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Stack direction="row" spacing={28} sx={{ height: '100%', alignItems: 'center' }}>
                <Paper variant="elevation" square={false} sx={{ backgroundColor: '#eeeeee', paddingX:5, paddingY:4, textAlign: 'left', borderRadius: 10, minWidth: '40%', height: '80%'}}>
                  <Stack spacing={0.5} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left'}}>
                      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"></link>
                      <Typography align="center" style={{fontSize: '150%', fontFamily: 'Poppins'}}>Sign in</Typography>
                      <Typography align="left" style={{fontWeight:'bold', fontFamily: 'Poppins'}}>Email</Typography>
                      <TextField id="outlined-controlled"
                        fullWidth
                        size="small"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        variant="outlined"
                        style={{ backgroundColor: '#F6F8FA'}}
                      />
                      <Typography align="left" style={{fontWeight:'bold', fontFamily: 'Poppins'}}>Password</Typography>
                      <OutlinedInput
                        fullWidth
                        size="small"
                        variant="outlined"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ backgroundColor: '#F6F8FA'}}
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
                      <Collapse in={openFail}>
                        <Alert severity="warning" sx={{marginTop: 2}}>
                          Email or password is incorrect
                        </Alert>
                      </Collapse>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop:20, marginBottom:10}}>
                        <Button variant='contained' size='medium' style={{fontSize: 16, width: '40%', fontFamily: 'Poppins', backgroundColor: "#FF9774", color: "white", textTransform: 'none', borderRadius: 15}} onClick={signIn} >Login</Button>
                      </div>
                      <div size='large' style={{fontSize: 14, fontFamily: 'Poppins', display: 'flex', justifyContent: 'center'}}>
                          Don't have an account?    
                        <a href="/sign-up"> Sign up </a>
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

export default Login;