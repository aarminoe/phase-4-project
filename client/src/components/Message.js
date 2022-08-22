import React, { useState } from "react"


function Message({message, loggedInUser, userList, conversation, onHandleDeleteMessage}) {
    console.log(message)
    
    

    function handleDeleteMessage() {
        onHandleDeleteMessage(message)
        fetch(`/users/${loggedInUser}/conversations/${conversation.id}/messages/${message.id}`, {
            method: 'DELETE',
        })
    }
    
    return(
        <div>          
            <div className="message">
                {conversation.conversation_with === message.who_messaged ?
                <div className="message-header">
                    {message.who_messaged} to {loggedInUser.username}:
                </div>
                 : 
                 <div className="message-header">
                    {message.who_messaged} to {conversation.conversation_with}:
                 </div>
                 }
                <p >
                    <button className="delete-message" onClick={handleDeleteMessage}>🞭</button>
                    {message.message}
                </p>         
            </div>
        </div>
    )
}

export default Message