import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { TbToolsKitchen3 } from "react-icons/tb";
import { Link } from "react-router-dom";
import {useEffect, useState} from 'react';


function ResponsiveAppBar() {

    const storedToken = localStorage.getItem("token");
    const token = (JSON.parse(storedToken));


    const [errorMessage, setErrorMessage] = useState('');
    const [pages, setPages] = useState([]);
    const [settings, setSettings] = useState([]);

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const check = async () => {
        try {
            //Vérifie si l'utilisateur est connecté pour set les liens/pages à affiché dans la navbar "un utilisateur non connecté ne doit pas pouvoir voir certains boutton lui permettant d'accéder à des pages inaccessibles pour un utilisateur non connecté
            const response = await fetch('http://localhost:8000/recette/checkUser', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
            });
            // console.log(response)
            if (response.status === 401) {
                setPages([
                    { label: 'toutes les recettes', lien: '/recettes' }
                ]); // Fermez l'appel de fonction setPages avec une parenthèse fermante

                setSettings([
                    { label: 'Login', lien: '/login' },
                    { label: 'Register', lien: '/register' }
                ]); // Fermez l'appel de fonction setSettings avec une parenthèse fermante
            }
            else {
                setPages([
                    { label: 'ajouter une recette', lien: '/ajoutrecette' },
                    { label: 'toutes les recettes', lien: '/recettes' }
                ]); // Fermez l'appel de fonction setPages avec une parenthèse fermante

                setSettings([
                    { label: 'Mes recettes', lien: '/mesrecettes' },
                    { label: 'Mes favoris', lien: '/favrecettes' },
                    { label: 'Mes abonnements', lien: '/abonnement' }
                ]); // Fermez l'appel de fonction setSettings avec une parenthèse fermante
            }
        } catch (error) {
            setErrorMessage(error.message);
        }
    }
    useEffect(() => {
        check()
    }, []);


    return (
        <AppBar position="static" className={"vert"}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <TbToolsKitchen3 sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        CookHub
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center">
                                        <Link to={page.lien}>{page.label}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.label}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {/*{page.label}*/}
                                <Link to={page.lien}>{page.label}</Link>
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.label} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">
                                        <Link to={setting.lien}>{setting.label}</Link>
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;
