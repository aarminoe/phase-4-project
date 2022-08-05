import Group from "./Group"
import GroupMember from "./GroupMember"
import React, {useState} from "react"
import GroupMessages from "./GroupMessages"

function GroupPage({groupClickedOn, loggedInUser, onToOtherProfile}) {
    console.log(groupClickedOn)

    const [currentGroup, setCurrentGroup] = useState(null)
    const [seeGroupMembers, setSeeGroupMembers] = useState(false)
    const [userInGroup, setUserInGroup] = useState(false)
    const [newGroupMessage, setNewGroupMessage] = useState('')

    function handleJoinGroup() {
        console.log(groupClickedOn.id)
        console.log(loggedInUser.id)
        setCurrentGroup(groupClickedOn)
        fetch(`/usergroups`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user_id: loggedInUser.id,
                group_id: groupClickedOn.id
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    function handleSeeGroupUsers() {
        setSeeGroupMembers((seeGroupMembers) => !seeGroupMembers)
        groupClickedOn.users.forEach((user) => {
            if (user.username === loggedInUser.username) {
                setUserInGroup(true)
            }
        })
    }

    function handleNewGroupMessage(e) {
        console.log('hwo')
        e.preventDefault()
        fetch('/group_messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: newGroupMessage,
                user_id: loggedInUser.id,
                group_id: groupClickedOn.id,
                sender_name: loggedInUser.username,
                sender_avatar_url: loggedInUser.avatar_url
            })
        })
        .then(resp => resp.json())
        .then(data => {
            console.log(data)
            setNewGroupMessage('')
        })
    }


    return (
        <p>
            {groupClickedOn.name}
                {seeGroupMembers ? 
                <div>
                    <button  onClick={handleSeeGroupUsers}>Hide Members</button>
                </div> :<button onClick={handleSeeGroupUsers}>See Members</button>}
                {!userInGroup && seeGroupMembers ?<button onClick={handleJoinGroup}>Join Group</button>:null }
                {seeGroupMembers ? groupClickedOn.users.map((user) => {
                    return <GroupMember user={user} onToOtherProfile={onToOtherProfile}/>
                })                
                : null}
            <form onSubmit={handleNewGroupMessage}>
                <input type='text' onChange={(e) => setNewGroupMessage(e.target.value)} value={newGroupMessage}></input>
                <button>Send Message</button>
            </form>
            <div>
                {groupClickedOn.group_messages.map((message) => {
                    return <GroupMessages message={message}/>
                })}
            </div>
        </p>
    )
}

export default GroupPage