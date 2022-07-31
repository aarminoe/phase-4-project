

function OneSearchedUser({user, loggedInUser}) {


    console.log(loggedInUser)
    console.log(user)
    function goToProfile(e) {
        console.log(user)
    }

    function handleAddFriend() {
        fetch(`/users/${loggedInUser.id}/friends`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user.username,
                user_id: loggedInUser.id
            }
            )
        })
        .then(resp => resp.json())
        .then(data => console.log(data))
    }

    return (
        <div onClick={goToProfile}>
            <p>{user.username}</p>
            <button onClick={handleAddFriend}>Add friend</button>
        </div>
    )
}

export default OneSearchedUser