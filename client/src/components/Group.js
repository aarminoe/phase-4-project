import React, { useState } from "react"
import GroupMember from "./GroupMember"

function Group({group, loggedInUser, onToOtherProfile}) {
    console.log(group.users)
    const [currentGroup, setCurrentGroup] = useState(null)
    const [seeGroupMembers, setSeeGroupMembers] = useState(false)
    const [userInGroup, setUserInGroup] = useState(false)
    
    function handleJoinGroup() {
        console.log(group.id)
        console.log(loggedInUser.id)
        setCurrentGroup(group)
        fetch(`/usergroups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: loggedInUser.id,
                group_id: group.id
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    function handleSeeGroupUsers() {
        setSeeGroupMembers((seeGroupMembers) => !seeGroupMembers)
        group.users.forEach((user) => {
            if (user.username === loggedInUser.username) {
                setUserInGroup(true)
            }
        })
    }

    return(
        <div>
            {group.name}
            <p>
                {seeGroupMembers ? 
                <div>
                    <button  onClick={handleSeeGroupUsers}>Hide Members</button>
                </div> :<button onClick={handleSeeGroupUsers}>See Members</button>}
                {!userInGroup && seeGroupMembers ?<button onClick={handleJoinGroup}>Join Group</button>:null }
                {seeGroupMembers ? group.users.map((user) => {
                    return <GroupMember user={user} onToOtherProfile={onToOtherProfile}/>
                })                
                : null}
                
            </p>
        </div>
    )
}

export default Group