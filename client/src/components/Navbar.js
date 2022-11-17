import React from 'react';
import LogoutBtn from "./logout";
import HomeBtn from "./HomeBtn";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";

import Auth from '../utils/auth';

const Navbar = () => {
    return (
        <>
            <header className="App-header">
                <Grid container justifyContent="end">
                    <Grid item>
                        <Stack spacing={2} direction="row" centered>
                            <HomeBtn />
                            {Auth.loggedIn()
                                ? <LogoutBtn />
                                : null}
                        </Stack>
                    </Grid>
                </Grid>
            </header>
            <div className="row">
                <div className="title text-center col-12">CATS VS. DOGS</div>
            </div>
        </>
    )
}

export default Navbar;