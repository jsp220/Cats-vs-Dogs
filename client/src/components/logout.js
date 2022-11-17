import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import Auth from "../utils/auth";



export const LogoutBtn = () => {
  const [value, setValue] = React.useState(0);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <Box sx={{ width: 100 }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          label="logout"
          icon={<LogoutIcon />}
          onClick={logout}
        />
      </BottomNavigation>
    </Box>

  );
};

export default LogoutBtn;
