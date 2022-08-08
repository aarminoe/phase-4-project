import React, { useState } from "react"
import SearchedUsers from "./SearchedUsers"

function Search({userList, loggedInUser, onToOtherProfile, onHandleAddFriend}) {

    const [searchedUser, setSearchedUser] = useState('')


    function handleSearch(e) {
        setSearchedUser(e.target.value.toLowerCase())
    }

 
    return (
        <div>
            Search
            <input type='text' onChange={handleSearch}></input>
            {searchedUser.length >= 1 ? userList.map((user) => {
                return <SearchedUsers user={user} searchedUser={searchedUser} loggedInUser={loggedInUser} onToOtherProfile={onToOtherProfile} onHandleAddFriend={onHandleAddFriend}/>
            }) : null}
        </div>
    )
}

export default Search