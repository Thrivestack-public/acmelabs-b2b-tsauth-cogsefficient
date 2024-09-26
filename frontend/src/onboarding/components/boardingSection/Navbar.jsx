import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { Icon } from '@iconify/react';

function Navbar({page}) {
    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: '#ECF0FD',
                boxShadow: 'none',
                color: '#000',
            }}
        >
            <Toolbar sx={{ justifyContent: 'space-between', padding: '0px' }}>
                {/* Left Section */}
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '10px',
                        gap: '10px',
                    }}
                >
                    <Typography sx={{ color: '#828282', fontSize: '14px' }}>You're in:</Typography>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            border: '1px solid #c2c2c2',
                            borderRadius: '7px',
                            padding: '5px 15px',
                            fontSize: '14px',
                            color: '#828282',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        Website
                    </Box>
                    <Box
                        sx={{
                            backgroundColor: 'white',
                            border: '1px solid #c2c2c2',
                            borderRadius: '7px',
                            padding: '5px 15px',
                            fontSize: '14px',
                            color: '#828282',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        Thrivestack
                    </Box>
                    <Box
                        sx={{
                            display: 'flex', // Flexbox to align items in a row
                            alignItems: 'center',
                            backgroundColor: '#E0EBFF',
                            border: '1px solid #ffffff',
                            borderRadius: '7px',
                            padding: '5px 15px',
                            fontSize: '14px',
                            color: '#2962FF',
                            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.25)',
                            gap: '8px'
                        }}
                    >
                        <Icon icon="teenyicons:pin-alt-outline" height="20" style={{ color: 'blue' }} />

                        Your app
                    </Box>
                </Box>

                { page === 3 ? (
                    <Typography
                    sx={{
                        position: 'absolute',
                        left: '45%',
                        transform: 'translateX(-50%)',
                        color: '#333333',
                        fontSize: '1.1vw',
                        fontWeight: '400',
                        whiteSpace: 'nowrap',
                    }}
                >
                    This is the simulation of your product’s <b>Home page</b>
                </Typography>
                ) : (
                    <Typography
                    sx={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        color: '#333333',
                        fontSize: '1.1vw',
                        fontWeight: '400',
                        whiteSpace: 'nowrap',
                    }}
                >
                    This is the simulation of your product’s <b>onboarding experience</b>
                </Typography>
                ) }
                
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;
