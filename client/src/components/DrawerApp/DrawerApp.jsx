import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import { Box,  } from "@mui/system";
import DrawerItems from "./DrawerItems";
import * as PATHS from "../../utils/paths";
import './DrawerApp.css';
import logo from "../../images/grouping.png";
import {ListItem} from "@mui/material";
import { Link } from "react-router-dom";



const DrawerApp = (props) => {
  const { window } = props;

  const drawerWidth = 240;
  const menuItems2 = [
    { name: "My Profile", icon: "manage_accounts", path: PATHS.MYPROFILE },
    { name: "Clock In", icon: "access_time", path: PATHS.ClOCKIN },
    { name: "Time Off", icon: "hail", path: PATHS.TIMEOFF },
    { name: "Calendar", icon: "calendar_today", path: PATHS.CALENDER },
    { name: "Employees", icon: "groups", path: PATHS.EMPLOYES },
    { name: "Tasks", icon: "assignment", path: PATHS.TASKS },
  ];

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const drawer = (
    <div>
      <Toolbar className="logo-div"> 
        <ListItem to="/" className="link" component={Link}>
          <img src={logo} alt="grouping logo"/>
          <p>Grouping</p>
        </ListItem>
      </Toolbar>
      <Divider />
      <Toolbar/>
      <DrawerItems items={menuItems2} />
    </div>
  );

  return (
    <Box sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 }}} className="Drawer">
      <Drawer
        container={container}
        variant="temporary"
        open={props.mobileOpen}
        onClose={props.handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
};

export default DrawerApp;
