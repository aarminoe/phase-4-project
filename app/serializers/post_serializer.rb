class PostSerializer < ActiveModel::Serializer
  attributes :id, :post, :created_at

  has_many :comments, include_nested_associations: true
  has_many :post_likes
  belongs_to :user
end
