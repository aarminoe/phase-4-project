import Message from "./Message"

function Messages({loggedInUser}) {

    return(
        <div>
            {loggedInUser.messages.map((message) => {
                return <Message message={message} loggedInUser={loggedInUser}/>
            })}
        </div>
    )
}

export default Messages