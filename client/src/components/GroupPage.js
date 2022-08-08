import Group from "./Group"
import GroupMember from "./GroupMember"
import React, {useState} from "react"
import GroupMessages from "./GroupMessages"

function GroupPage({loggedInUser, onToOtherProfile, onAddGroupMessage, group}) {
    

    const [seeGroupMembers, setSeeGroupMembers] = useState(false)
    const [userInGroup, setUserInGroup] = useState(false)
    const [newGroupMessage, setNewGroupMessage] = useState('')
    const [notInGroupError, setNotInGroupError] =useState(false)
    const [groupMessages, setGroupMessages] = useState(group.group_messages)

    function handleJoinGroup() {
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

    function handleNewGroupMessage(e) {
        e.preventDefault()
                fetch('/group_messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        message: newGroupMessage,
                        user_id: loggedInUser.id,
                        group_id: group.id,
                        sender_name: loggedInUser.username,
                        sender_avatar_url: loggedInUser.avatar_url
                    })
                })
                .then(resp => resp.json())
                .then(data => {
                    addGroupMessage(data)
                    setNewGroupMessage('')
                })
           
    }

    function addGroupMessage(message) {
        const updatedGroupMessages = [...group.group_messages, message]
        setGroupMessages(updatedGroupMessages)
    }
    


    return (
        <p>
            {group.name}
                {seeGroupMembers ? 
                <div>
                    <button  onClick={handleSeeGroupUsers}>Hide Members</button>
                </div> :
                <div>
                    <button onClick={handleSeeGroupUsers}>See Members/Join Group</button>
                </div>}
                {!userInGroup && seeGroupMembers ?<button onClick={handleJoinGroup}>Join Group</button>:null }
                {seeGroupMembers ? group.users.map((user) => {
                    return <GroupMember user={user} onToOtherProfile={onToOtherProfile}/>
                })                
                : null}
            <form onSubmit={handleNewGroupMessage}>
                Must be in group to add messages!
                <p>
                    <input type='text' onChange={(e) => setNewGroupMessage(e.target.value)} value={newGroupMessage}></input>
                    <button>Send Message</button>
                </p>
            </form>
            <div>
                {groupMessages.map((message) => {
                    return <GroupMessages message={message}/>
                })}
            </div>
        </p>
    )
}

export default GroupPage