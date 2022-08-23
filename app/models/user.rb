class User < ApplicationRecord
    has_many :friends, dependent: :destroy
    has_many :posts, dependent: :destroy
    has_many :post_likes, through: :posts, dependent: :destroy
    has_many :usergroups
    has_many :groups, through: :usergroups
    has_many :comments, through: :posts, dependent: :destroy
    has_many :comment_likes, through: :comments, dependent: :destroy
    has_many :conversations
    has_many :messages, through: :conversations
    has_many :group_messages


    has_secure_password

    validates :username, uniqueness: true, presence: true, length: {within: 3..24}
    validates :password, presence: true, confirmation: true, length: {within: 8..24}
    validates :avatar_url, presence: true 
    validates :bio, presence: true

end
