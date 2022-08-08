


function GroupMessages({message}) {

    return (
        <div>
            <div>
                <img className="avatar-group-member" src={message.sender_avatar_url}></img>
                {message.sender_name}
                <p>
                    {message.message}
                </p>
            </div> 
        </div>
    )
}

export default GroupMessages