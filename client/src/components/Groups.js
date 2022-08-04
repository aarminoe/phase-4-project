import Group from "./Group"

function Groups({groupList, loggedInUser, onToOtherProfile, onToGroupPage }) {
    console.log(groupList)
    return( 
        <div>
            {groupList.map((group) => {
                return <Group group={group} loggedInUser={loggedInUser} onToOtherProfile={onToOtherProfile} onToGroupPage={onToGroupPage} />
            })}
        </div>
    )
}

export default Groups