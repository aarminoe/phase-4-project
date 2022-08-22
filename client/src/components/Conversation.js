import Messages from "./Messages"
import React, { useState, useEffect } from "react"

function Conversation({loggedInUser, userList, newMessageNewConversation}) {

    const [userConversations, setUserConversations] = useState(loggedInUser.conversations)



    return(
        <div>
            <p className="conversations-header">
                Conversations:
            </p>  
            {loggedInUser.conversations.map((conversation) => {
                return <Messages conversation={conversation} conversationmessages={conversation.messages}loggedInUser={loggedInUser} userList={userList} />
            })}
        </div>
    )
}

export default Conversation