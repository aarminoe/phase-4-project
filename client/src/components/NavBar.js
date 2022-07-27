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
            <NavLink 
            className='navlink'
            exact to='/groups' 
            activeStyle={{color: 'white'}}>Groups</NavLink>
            <NavLink 
            className='navlink'
            exact to='/notifications' 
            activeStyle={{color: 'white'}}>Notifications</NavLink>
            <NavLink 
            className='navlink'
            exact to='/messages' 
            activeStyle={{color: 'white'}}>Messages</NavLink>
            <NavLink 
            className='navlink'
            exact to='/search' 
            activeStyle={{color: 'white'}}>Search</NavLink>
       </div> 
    )
}

export default NavBar