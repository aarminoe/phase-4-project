import Group from "./Group"
import GroupMember from "./GroupMember"
import React, {useState} from "react"
import GroupMessages from "./GroupMessages"

function GroupPage({loggedInUser, onToOtherProfile, group}) {
    
    console.log(group)
    const [seeGroupMembers, setSeeGroupMembers] = useState(false)
    const [userInGroup, setUserInGroup] = useState(false)
    const [newGroupMessage, setNewGroupMessage] = useState('')
    const [groupMessages, setGroupMessages] = useState(group.group_messages)
    const [groupUsers, setGroupUsers] = useState(group.users)
    console.log(group)
    function handleJoinGroup() {
        console.log(group)
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
        .then(data => {
            console.log(data)
            handleJoinGroupNewUser(loggedInUser)
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

    function handleSeeGroupUsers() {
        setSeeGroupMembers((seeGroupMembers) => !seeGroupMembers)
        group.users.forEach((user) => {
            if (user.username === loggedInUser.username) {
                setUserInGroup(true)
            }
        })
    }

    function addGroupMessage(message) {
        const updatedGroupMessages = [...group.group_messages, message]
        setGroupMessages(updatedGroupMessages)
    }

    function handleJoinGroupNewUser(newUser) {
        const updatedGroupUsers = [...groupUsers, newUser]
        setGroupUsers(updatedGroupUsers)
    }
    


    return (
        <p className="single-group">
            <div className="group-page-name">
                {group.name}
            </div>
            
                {seeGroupMembers ? 
                <div>
                    <button  onClick={handleSeeGroupUsers}>Hide Members</button>
                </div> :
                <div>
                    <button onClick={handleSeeGroupUsers}>See Members/Join Group</button>
                </div>}
                {!userInGroup && seeGroupMembers ?<button onClick={handleJoinGroup}>Join Group</button>:null }
                {seeGroupMembers ? groupUsers.map((user) => {
                    return <GroupMember user={user} onToOtherProfile={onToOtherProfile}/>
                })                
                : null}
            <form onSubmit={handleNewGroupMessage}>
                <p className="must-be-in-group">
                </p>
                <p>
                    <input type='text' onChange={(e) => setNewGroupMessage(e.target.value)} value={newGroupMessage}></input>
                    <button>Send Message</button>
                </p>
            </form>
            <div>
                {groupMessages.map((message) => {
                    return <GroupMessages message={message} />
                })}
            </div>
        </p>
    )
}

export default GroupPage