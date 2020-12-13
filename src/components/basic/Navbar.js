import React from 'react';
import {NavLink} from "react-router-dom";

import {Typography, Button} from '@material-ui/core';

import './Navbar.scss'

import ToggleButton from "../elementary/ToggleButton";

function Navbar() {
    return (
        <div className='NavBar'>
            <Typography variant="h5" component="h5" className="NavBar__name">
                Weather SPA
            </Typography>

            <ToggleButton/>

            <div className="NavBar__buttons">
                <NavLink to="/">
                    <Button variant="outlined">Home</Button>
                </NavLink>
                <NavLink to="/favorites">
                    <Button variant="outlined">Favorites</Button>
                </NavLink>
            </div>
        </div>
    );
}

export default Navbar;