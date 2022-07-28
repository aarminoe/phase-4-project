class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment

  has_many :comment_likes
  belongs_to :post
end
