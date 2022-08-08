import Messages from "./Messages"
import React, { useState } from "react"

function Conversation({loggedInUser, userList, newMessageNewConversation}) {

    const [userConversations, setUserConversations] = useState(loggedInUser.conversations)

    console.log(newMessageNewConversation)
    console.log(loggedInUser.conversations)
    return(
        <div>
            {loggedInUser.conversations.map((conversation) => {
                return <Messages conversation={conversation} loggedInUser={loggedInUser} userList={userList} />
            })}
        </div>
    )
}

export default Conversation