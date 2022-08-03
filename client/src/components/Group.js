import React, { useState } from "react"

function Group({group, loggedInUser}) {

    const [currentGroup, setCurrentGroup] = useState(null)
    
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

    return(
        <div>
            {group.name}
            <p>
                {group.users.includes(loggedInUser.id) ? null : <button onClick={handleJoinGroup}>Join!</button>}
            </p>
        </div>
    )
}

export default Group