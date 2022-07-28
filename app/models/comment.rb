class Comment < ApplicationRecord
    has_many :comment_likes
    belongs_to :post
end
