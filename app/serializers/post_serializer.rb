class PostSerializer < ActiveModel::Serializer
  attributes :id, :post

  has_many :comments, include_nested_associations: true
  has_many :post_likes, include_nested_associations: true
  belongs_to :user
end
