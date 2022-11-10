import React from "react";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import LoginIcon from "@mui/icons-material/Login";
import SignupIcon from "@mui/icons-material/GroupAdd";
import GameIcon from "@mui/icons-material/SportsEsports";

export const Home = () => {
  const [value, setValue] = React.useState(0);
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
                  href="/login"
                  label="login"
                  icon={<LoginIcon />}
                />
                <BottomNavigationAction
                  href="/signup"
                  label="signup"
                  icon={<SignupIcon />}
                />
                <BottomNavigationAction
                  href="/game"
                  label="game"
                  icon={<GameIcon />}
                />
              </BottomNavigation>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
