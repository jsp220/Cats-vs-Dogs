import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LogoutBtn from "../components/logout";


import Auth from '../utils/auth';

const Navbar = () => {
    return (
        <>
            {Auth.loggedIn()
                ? <LogoutBtn />
                : null}
            <div className="row">
                <div className="title text-center col-12">CATS VS. DOGS</div>
            </div>
        </>
    )
}

export default Navbar;