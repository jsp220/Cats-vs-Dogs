import React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import HomeIcon from "@mui/icons-material/Home";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

const HomeBtn = () => {
    const [value, setValue] = React.useState(0);

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
                    href="/"
                    label="Home"
                    icon={<HomeIcon />}
                />
            </BottomNavigation>
        </Box>
    );
}

export default HomeBtn;