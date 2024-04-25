import React from 'react';
import logo from '../../resources/logo.png';
import { Box, Button, Stack, Typography } from '@mui/material';

const OpeningPage = () =>  {
    return(
        <div className="App">
            <Box sx={{ maxWidth: '84%', maxHeight: '70%', marginLeft: '10%', marginTop: '5%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <Stack direction="row" spacing={4}>
                    <Stack spacing={4} sx={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left'}}>
                        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap" rel="stylesheet"></link>
                        <Typography align="left" style={{fontSize: 60, fontFamily: 'Poppins', fontWeight:'bolder', color: "#247360"}}>Where every page turned is a milestone</Typography>
                        <Typography align="left" style={{fontSize: 25, fontFamily: 'Poppins', color: "#247360"}}>Search for your next book adventure</Typography>
                        <Stack align="left" direction="row" spacing={8} >
                            <a href="/sign-up">
                                <Button variant='contained' size='large' style={{fontSize: 20, width: '125%', fontFamily: 'Poppins', backgroundColor: "#FFD4A7", color: "white", textTransform: 'none', borderRadius: 15}}>Sign up</Button>
                            </a>
                            <a href="/login">
                                <Button variant='contained' size='large' style={{fontSize: 20, width: '150%', fontFamily: 'Poppins', backgroundColor: "#FF9774", color: "white", textTransform: 'none', borderRadius: 15}}>Login</Button>
                            </a>
                            </Stack>
                    </Stack>
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={logo} alt='logo' />
                    </Box>  
                </Stack>
            </Box>
        </div>
    );
}

export default OpeningPage;