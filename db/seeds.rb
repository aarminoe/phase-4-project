require 'faker'



User.create(username: 'test', password: '12345678', password_confirmation:'12345678', avatar_url: 'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=', bio: '')
User.create(username: 'Aarontest', password: '12345678', password_confirmation: '12345678', avatar_url: 'https://media.istockphoto.com/photos/businessman-silhouette-as-avatar-or-default-profile-picture-picture-id476085198?b=1&k=20&m=476085198&s=170667a&w=0&h=Ct4e1kIOdCOrEgvsQg4A1qeuQv944pPFORUQcaGw4oI=', bio: '')
20.times do 
    User.create!(username: Faker::Name.unique.first_name, password: '12345678', password_confirmation: '12345678', avatar_url: Faker::LoremFlickr.image)
end
Post.create(post: 'hi', user_id: 1)
Post.create(post: 'Crazy night!', user_id: 2)
Post.create(post: 'still postin123', user_id: 2)
Post.create(post: 'Crazy morning!', user_id: 2)
Comment.create(comment: 'hello', post_id: 1)
Comment.create(comment: 'whoa!!', post_id: 3)
PostLike.create(user_who_liked: 'Aaron', post_id:1)
PostLike.create(user_who_liked: 'Jimmy', post_id:2)
PostLike.create(user_who_liked: 'John', post_id:2)
PostLike.create(user_who_liked: 'Jane', post_id:3)
PostLike.create(user_who_liked: 'Jericho', post_id:3)
PostLike.create(user_who_liked: 'Josh', post_id:3)
CommentLike.create(user_who_liked: 'Jimmy', comment_id:1)
Message.create(message: 'Hey whats up', user_who_messaged: 'Some Guy', user_id: 1)
Message.create(message: 'Hey', user_who_messaged: 'Josh', user_id: 1)
Message.create(message: 'Nice seeing you', user_who_messaged: 'Jaden', user_id: 1)
Message.create(message: 'Whoa!!', user_who_messaged: 'Jericho', user_id: 1)
Message.create(message: 'Crazyyyyyy', user_who_messaged: 'Some Guy', user_id: 1)