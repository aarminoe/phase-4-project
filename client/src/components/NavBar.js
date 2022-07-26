import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {


    return (
       <div className="navbar">
            <NavLink 
            className='navlink' 
            exact to='/' 
            activeStyle={{color: 'white'}}>Home</NavLink>
            <NavLink 
            className='navlink'
            exact to='/profile' 
            activeStyle={{color: 'white'}}>Profile</NavLink>
       </div> 
    )
}

export default NavBar