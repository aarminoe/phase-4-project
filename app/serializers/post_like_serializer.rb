class PostLikeSerializer < ActiveModel::Serializer
  attributes :id, :user_who_liked, :post_id

  belongs_to :post
end
