import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({loggedInUser}) {


    return (
       <div className="navbar">
            <NavLink 
            className='navlink' 
            exact to='/' 
            activeStyle={{color: 'black'}}>🏠</NavLink>
            <NavLink 
            className='navlink'
            exact to='/profile' 
            activeStyle={{color: 'black'}}>👤</NavLink>
            <NavLink 
            className='navlink'
            exact to='/groups' 
            activeStyle={{color: 'black'}}>👥</NavLink>
            <NavLink 
            className='navlink'
            exact to='/messages' 
            activeStyle={{color: 'black'}}>🗪</NavLink>
            <NavLink 
            className='navlink'
            to='/search' 
>🔍</NavLink>
       </div> 
    )
}

export default NavBar