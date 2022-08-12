


function GroupMessages({message}) {

    return (
        <div className="group-message-card">
            <div>
                <img className="avatar-group-member" src={message.sender_avatar_url}></img>
                {message.sender_name}
                <p className="group-message">
                    {message.message}
                </p>
            </div> 
        </div>
    )
}

export default GroupMessages