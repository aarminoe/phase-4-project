

function Message({message, loggedInUser}) {
    console.log(message)

    function handleDeleteMessage(deletedMessage) {
        fetch(`/users/${loggedInUser.id}/messages/${message.id}`, {
            method: 'DELETE',
        })
        .then(d => console.log(deletedMessage))
    }

    return(
        <div>
            <button onClick={handleDeleteMessage}>🞭</button>
            {message.user_who_messaged} said: 
            <p>
                {message.message}
            </p>
        </div>
    )
}

export default Message