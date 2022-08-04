import React, { useState } from "react"
import GroupMember from "./GroupMember"
import { NavLink } from "react-router-dom"

function Group({group, loggedInUser, onToOtherProfile, onToGroupPage}) {


    function handleToGroupPage() {
        onToGroupPage(group)
    }

    return(
        <div>
            <NavLink onClick={handleToGroupPage} exact to='/group-page' >{group.name}</NavLink>
        </div>
    )
}

export default Group