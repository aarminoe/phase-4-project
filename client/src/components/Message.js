import React, { useState } from "react"


function Message({message, loggedInUser, userList, conversation}) {
    console.log(message)
    console.log(userList)
    

    function handleDeleteMessage() {
        console.log(message)
        fetch(`/users/${loggedInUser}/conversations/${conversation.id}/messages/${message.id}`, {
            method: 'DELETE',
        })
    }
    

    return(
        <div>
            
            <div>
                {message.who_messaged} said: 
                <p>
                    <button onClick={handleDeleteMessage}>🞭</button>
                    {message.message}
                </p>
                
            </div>
        </div>
    )
}

export default Message