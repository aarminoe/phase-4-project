import React, { useState } from "react"


function Message({message, loggedInUser, userList, conversation, onHandleDeleteMessage}) {
    console.log(message)
    console.log(userList)
    

    function handleDeleteMessage() {
        onHandleDeleteMessage(message)
        fetch(`/users/${loggedInUser}/conversations/${conversation.id}/messages/${message.id}`, {
            method: 'DELETE',
        })
    }
    
    return(
        <div>
            
            <div>
                {conversation.conversation_with === message.who_messaged ? `${message.who_messaged} to ${loggedInUser.username}:` : `${message.who_messaged} to ${conversation.conversation_with}:`}
                <p>
                    <button onClick={handleDeleteMessage}>🞭</button>
                    {message.message}
                </p>
                
            </div>
        </div>
    )
}

export default Message