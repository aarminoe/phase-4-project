import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {


    return (
       <div className="navbar">
            <NavLink 
            className='navlink' 
            exact to='/' 
            activeStyle={{color: 'black'}}>Home</NavLink>
            <NavLink 
            className='navlink'
            exact to='/profile' 
            activeStyle={{color: 'black'}}>Profile</NavLink>
            <NavLink 
            className='navlink'
            exact to='/groups' 
            activeStyle={{color: 'black'}}>Groups</NavLink>
            <NavLink 
            className='navlink'
            exact to='/notifications' 
            activeStyle={{color: 'black'}}>Notifications</NavLink>
            <NavLink 
            className='navlink'
            exact to='/messages' 
            activeStyle={{color: 'black'}}>Messages</NavLink>
            <NavLink 
            className='navlink'
            exact to='/search' 
            activeStyle={{color: 'black'}}>Search</NavLink>
       </div> 
    )
}

export default NavBar