class PostLikeSerializer < ActiveModel::Serializer
  attributes :id, :user_who_liked

  belongs_to :post
end
