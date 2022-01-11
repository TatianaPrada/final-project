import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from "@mui/icons-material/Menu";
import * as PATHS from "../../utils/paths";
import { Link } from "react-router-dom";
import logo from "../../images/grouping.png";
import AccountCircleTwoToneIcon from "@mui/icons-material/AccountCircleTwoTone";
import LoginTwoToneIcon from "@mui/icons-material/LoginTwoTone";
import "./Navbar.css";
import { Button } from "@mui/material";
import { ListItem } from "@mui/material";

const Navbar = (props) => {
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar
      position="sticky"
      className="Navbar"
      sx={{ backgroundColor: "#37384E", paddingY: "2px" }}
    >
      <Box>
        <Toolbar disableGutters>
          <IconButton
            aria-label="open drawer"
            edge="start"
            img={logo}
            onClick={props.handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            {props.user && <MenuIcon />}
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: "flex" }}
          ></Typography>

          {props.user ? (
            <Box sx={{ flexGrow: 0, marginRight: 3}}>
              <Tooltip title="User Menu">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={props.user.photo} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem button component={Link} to={PATHS.MYPROFILE}>
                  {" "}
                  My Profile
                </MenuItem>
                <MenuItem>
                  <Typography textAlign="center" onClick={props.handleLogout}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          ) : (
            <>
              <div className="logo-div">
                <ListItem to="/" className="link" component={Link}>
                  <img src={logo} alt="grouping logo" />
                  <p>Grouping</p>
                </ListItem>
              </div>

              <Button
                sx={{
                  backgroundColor: "transparent",
                  color: "white",
                  mr: "1em",
                }}
                component={Link}
                to={PATHS.SIGNUPPAGE}
                variant="contained"
              >
                <AccountCircleTwoToneIcon /> Sign Up
              </Button>

              <Button
                sx={{ backgroundColor: "transparent", color: "white" }}
                component={Link}
                to={PATHS.LOGINPAGE}
                variant="contained"
              >
                <LoginTwoToneIcon /> Log In
              </Button>
            </>
          )}
        </Toolbar>
      </Box>
    </AppBar>
  );
};

export default Navbar;
