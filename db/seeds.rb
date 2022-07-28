# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create(name: 'test', password: '12345678', password_confirmation:'12345678')
Post.create(post: 'hi', user_id: 1)
Comment.create(comment: 'hello', post_id: 1)
PostLike.create(user_who_liked: 'Jimmy', post_id:1)
CommentLike.create(user_who_liked: 'Jimmy', comment_id:1)