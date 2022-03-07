import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Button, Container, Box, IconButton, Toolbar, MenuItem, Typography, Menu } from "@mui/material";
import { MouseEvent, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import colors from "../../styles/colors.module.scss";

export const Layout = () => {
  const navigate = useNavigate();
  const [menuAnchor, setMenuAnchor] = useState<HTMLElement | null>(null)

  const routes = [
    {
      path: "/myCollection",
      name: "My Collection",
    },
    {
      path: "/search",
      name: "Search",
    },
  ];

  const handleClick = (route: string) => {
    navigate(route);
  };

  const handleCloseNav = () => {
    setMenuAnchor(null)
  }

  const handleOpenNav = (e: MouseEvent<HTMLElement>) => {
    setMenuAnchor(e.currentTarget)
  }

  return (
    <>
      <AppBar position="fixed">
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link
            to="/"
            style={{
              fontFamily: "Roboto",
              color: colors.white,
              fontWeight: "bold",
              textDecoration: "none",
              fontSize: 30,
              marginRight: 20
            }}
          >
            BRIDGE
          </Link>
          <Box sx={{ display: { xs: 'none', md: 'block'}}}>
            {routes.map((route) => (
              <Button onClick={() => handleClick(route.path)} color="inherit" key={route.path}>
                {route.name}
              </Button>
            ))}
          </Box>
          <Box sx={{ display: { md: 'none'}}}>
            <Toolbar disableGutters>
              <IconButton
                size="large"
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={handleOpenNav}
              >
                <MenuIcon />
              </IconButton>
              <Menu
              id="menu-appbar"
              anchorEl={menuAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(menuAnchor)}
              onClose={handleCloseNav}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {routes.map((route) => (
                <MenuItem key={route.path} onClick={() => handleClick(route.path)}>
                  <Typography textAlign="center">{route.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
            </Toolbar>
          </Box>
        </Container>
      </AppBar>
      <Box sx={{ marginTop: 8 }}>
        <Outlet />
      </Box>
    </>
  );
};
