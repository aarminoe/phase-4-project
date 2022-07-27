class User < ApplicationRecord
    has_many :friends, dependent: :destroy
    has_many :posts, dependent: :destroy
    has_many :groups, dependent: :destroy
    has_many :comments, through: :posts, dependent: :destroy
    has_many :likes, through: :posts, dependent: :destroy
    has_one :profile 
    has_secure_password

    validates :name, uniqueness: true, presence: true

end
