import React from 'react';
import {AppBar, Toolbar, Typography, Box} from '@mui/material';
import {Link, useLocation} from 'react-router-dom';

const activeFontColor = '#f3bac3';

const Header = () => {
    const location = useLocation();  // Get current route from React Router

    return (
        <AppBar position="sticky">
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box display="flex" alignItems="center">
                    <img
                        src="/gary.webp"
                        alt="Custom Icon"
                        style={{width: 50, height: 50, marginRight: 10}}
                    />
                    <Typography variant="h6">Welbi</Typography>
                </Box>
                <Box sx={{flexGrow: 1, display: 'flex', paddingRight: '70px', justifyContent: 'center'}}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/residents"
                        sx={{
                            color: location.pathname === '/residents' || location.pathname === '/' ? activeFontColor : 'inherit',  // Check if active tab
                            textDecoration: 'none',
                            margin: '0 20px',
                            '&:hover': {
                                color: activeFontColor,
                            },
                            '&:active': {
                                color: activeFontColor,
                            },
                        }}
                    >
                        Residents
                    </Typography>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/programs"
                        sx={{
                            color: location.pathname === '/programs' ? activeFontColor : 'inherit',  // Check if active tab
                            textDecoration: 'none',
                            margin: '0 20px',
                            '&:hover': {
                                color: activeFontColor,
                            },
                            '&:active': {
                                color: activeFontColor,
                            },
                        }}
                    >
                        Programs
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;