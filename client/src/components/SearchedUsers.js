import OneSearchedUser from "./OneSearchedUser"

function SearchedUsers({user, setSearchedUserList, searchedUser}) {
    return (
        <div>
            {user.username.toLowerCase().includes(searchedUser) ? <OneSearchedUser user={user} /> :null}
        </div>
    )
}

export default SearchedUsers
