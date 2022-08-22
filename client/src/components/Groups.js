import Group from "./Group"
import React, { useState } from "react"

function Groups({groupList, loggedInUser, onToOtherProfile, onToGroupPage, groupClickedOn, onHandleNewGroup}) {
    
    const [newGroupName, setNewGroupName] = useState('')

    function handleNewGroup(e) {
        e.preventDefault()
        fetch('/groups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: newGroupName,
                number_of_members: null
            })
        })
        .then(resp => resp.json())
        .then(data => {
            onHandleNewGroup(data)
            setNewGroupName('')
        })
    }

    return( 
        <div>
            <p className="group-header">
                Cliques:
            </p>
            <form onSubmit={handleNewGroup}>
                <input className="input-new-group" onChange={(e) => setNewGroupName(e.target.value)} type='text' value={newGroupName} ></input>
                <button>Add Group</button>
            </form>
            {groupList.map((group) => {
                return <Group group={group} loggedInUser={loggedInUser} onToOtherProfile={onToOtherProfile} onToGroupPage={onToGroupPage} groupClickedOn={groupClickedOn}/>
            })}
        </div>
    )
}

export default Groups