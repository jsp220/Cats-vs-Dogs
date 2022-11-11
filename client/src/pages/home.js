import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LogoutIcon from "@mui/icons-material/Logout";
import GameIcon from "@mui/icons-material/SportsEsports";
import Auth from "../utils/auth";


export const Home = () => {
  const [value, setValue] = React.useState(0);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      <Grid container justifyContent="end">
        <Grid item>
          <Stack spacing={2} direction="row" centered>
            <Box sx={{ width: 500 }}>
              <BottomNavigation
                showLabels
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              >
                <BottomNavigationAction
                  href="/game"
                  label="game"
                  icon={<GameIcon />}
                />
                <BottomNavigationAction label="logout" icon={<LogoutIcon />} onClick={logout}/>
              </BottomNavigation>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
