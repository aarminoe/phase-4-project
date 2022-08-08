import Message from "./Message"
import React, { useState } from "react"

function Messages({loggedInUser, conversation, userList, newMessageNewConversation}) {

    console.log(conversation)

    const [replyMessage, setReplyMessage] = useState('')
    const [userToReplyTo, setUserToReplyTo] = useState(null)
    const [sentConversationData, setSentConversationData] = useState(null)
    const [conversationMessages, setConversationMessages] = useState(conversation.messages)



    function handleReplyMessage(e) {
        setReplyMessage(e.target.value)
        console.log(conversation)
        userList.forEach((user) => {
            console.log('here')
            if (user.username === conversation.conversation_with) {
                setUserToReplyTo(user)
                user.conversations.forEach((conversation) => {
                    if (conversation.conversation_with === loggedInUser.username) {
                        console.log(conversation.id)
                        setSentConversationData(conversation.id)
                    }
                })
            }
        })
    }



    function handleReplyMessageSend(e) {
        e.preventDefault()
        console.log(conversation)
        console.log(sentConversationData)
        fetch(`/users/${userToReplyTo.id}/conversations/${sentConversationData}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: replyMessage,
                who_messaged: loggedInUser.username,
                conversation_id: sentConversationData
            })
        })
        .then(resp => resp.json())
        .then(data => console.log(data))

        fetch(`/users/${loggedInUser.id}/conversations/${conversation.id}/messages`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: replyMessage,
                who_messaged: loggedInUser.username,
                conversation_id: conversation.id
            })
        })
        .then(resp => resp.json())
        .then(data => newMessageInConversation(data))
        
    }

    function newMessageInConversation(newMessage) {
        const updatedConversationMessages = [...conversationMessages, newMessage]
        setConversationMessages(updatedConversationMessages)
    }

    function handleDeleteMessage(deletedMessage) {
        const updatedConversationMessages = conversationMessages.filter((message) => {
            return message !== deletedMessage
        })
        setConversationMessages(updatedConversationMessages)
    }

    

    return(
        <div>
            {conversationMessages.map((message) => {
                return <Message message={message} loggedInUser={loggedInUser} userList={userList} conversation={conversation} onHandleDeleteMessage={handleDeleteMessage}/>
            })}
            {conversationMessages[0] ? 
            <form onSubmit={handleReplyMessageSend}>
                <input type='text' placeholder='Reply...' onChange={handleReplyMessage}></input>
                <button>send</button>
            </form> : null}
        </div>
    )
}

export default Messages