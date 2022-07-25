import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {


    return (
       <div className="navbar">
            <NavLink exact to='/' >Home</NavLink>
            <NavLink exact to='/profile'>Profile</NavLink>
       </div> 
    )
}

export default NavBar