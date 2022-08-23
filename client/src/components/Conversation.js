import Messages from "./Messages"
import React from "react"

function Conversation({loggedInUser, userList}) {

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