class User < ApplicationRecord
    has_many :friends, dependent: :destroy
    has_many :posts, dependent: :destroy
    has_many :post_likes, through: :posts, dependent: :destroy
    has_many :groups, dependent: :destroy
    has_many :comments, through: :posts, dependent: :destroy
    has_many :comment_likes, through: :comments, dependent: :destroy
    has_one :profile, dependent: :destroy
    has_secure_password

    validates :name, uniqueness: true, presence: true
    validates :password, presence: :true, confirmation: true, length: {within: 8..24}

end