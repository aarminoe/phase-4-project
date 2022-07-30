

function OneSearchedUser({user}) {

    function goToProfile(e) {
        console.log(user)
    }

    return (
        <div onClick={goToProfile}>
            <p>{user.username}</p>
        </div>
    )
}

export default OneSearchedUser