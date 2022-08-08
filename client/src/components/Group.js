import React, { useState } from "react"
import GroupMember from "./GroupMember"
import { NavLink } from "react-router-dom"
import GroupPage from "./GroupPage"

function Group({group, loggedInUser, onToOtherProfile, onToGroupPage, groupClickedOn}) {

    const [seeGroupPage, setSeeGroupPage] = useState(false)

    function handleToGroupPage() {
        setSeeGroupPage((seeGroupPage) => !seeGroupPage)
        onToGroupPage(group)
    }

    return(
        <div>
            <button onClick={handleToGroupPage} exact to='/group-page' group={group}>{group.name}</button>
            {seeGroupPage ? <GroupPage group={group} groupClickedOn={groupClickedOn} loggedInUser={loggedInUser}/> : null}
        </div>
    )
}

export default Group