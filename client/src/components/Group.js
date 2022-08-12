import React, { useState } from "react"
import GroupMember from "./GroupMember"
import { NavLink } from "react-router-dom"
import GroupPage from "./GroupPage"

function Group({group, loggedInUser, onToOtherProfile, groupClickedOn}) {

    const [seeGroupPage, setSeeGroupPage] = useState(false)

    function handleToGroupPage() {
        setSeeGroupPage((seeGroupPage) => !seeGroupPage)
    }

    return(
        <div >
            <button className="group-button" onClick={handleToGroupPage} exact to='/group-page' group={group}>{group.name}</button>
            {seeGroupPage ? <GroupPage group={group} groupClickedOn={groupClickedOn} loggedInUser={loggedInUser} onToOtherProfile={onToOtherProfile}/> : null}
        </div>
    )
}

export default Group