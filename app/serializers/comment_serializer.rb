class CommentSerializer < ActiveModel::Serializer
  attributes :id, :comment, :who_commented

  has_many :comment_likes
  belongs_to :post
end
