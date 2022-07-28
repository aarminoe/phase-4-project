class CommentLikeSerializer < ActiveModel::Serializer
  attributes :id, :user_who_liked

  belongs_to :comment
end
