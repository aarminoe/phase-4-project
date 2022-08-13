import React from "react"
import { NavLink } from "react-router-dom"

function GroupMember({user, onToOtherProfile}) {
    return (
        <div>
        
            <div>
                <img className="avatar-group-member" src={user.avatar_url}></img>
                <NavLink onClick={() => onToOtherProfile(user)} exact to='/other-user-profile' >{user.username}</NavLink>            
            </div>     
        </div>
    )
}

export default GroupMember