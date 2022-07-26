class User < ApplicationRecord
    has_many :friends
    has_many :posts
    has_many :groups
    has_many :comments, through: :posts 
    has_many :likes, through: :posts
    has_secure_password

    validates :name, uniqueness: true, presence: true

end
