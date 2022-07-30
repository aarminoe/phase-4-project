# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(username: 'test', password: '12345678', password_confirmation:'12345678')
User.create(username: 'Aaron', password: '12345678', password_confirmation: '12345678')
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