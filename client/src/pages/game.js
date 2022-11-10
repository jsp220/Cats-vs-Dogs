import React from "react";
import CodeNames from "../components/codeNames";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";

function Game() {
  const [value, setValue] = React.useState(0);
  return (
    <div className="App">
      <header className="App-header">
        <Grid container justifyContent="end">
          <Grid item>
            <Stack spacing={2} direction="row" centered>
              <Box sx={{ width: 200 }}>
                <BottomNavigation
                  showLabels
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue);
                  }}
                >
                  <BottomNavigationAction
                    href="/"
                    label="Home"
                    icon={<HomeIcon />}
                  />
                </BottomNavigation>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <CodeNames />
      </header>
    </div>
  );
}

export default Game;
