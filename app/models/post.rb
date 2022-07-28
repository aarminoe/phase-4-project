class Post < ApplicationRecord
    has_many :post_likes
    has_many :comments
    belongs_to :user
end
