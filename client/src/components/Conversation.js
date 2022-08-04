import Messages from "./Messages"

function Conversation({loggedInUser, userList}) {
    console.log(loggedInUser.conversations)
    return(
        <div>
            {loggedInUser.conversations.map((conversation) => {
                return <Messages conversation={conversation} loggedInUser={loggedInUser} userList={userList}/>
            })}
        </div>
    )
}

export default Conversation