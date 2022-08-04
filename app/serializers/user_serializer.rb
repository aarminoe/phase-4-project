class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :avatar_url, :bio

  has_many :friends
  has_many :groups
  has_many :conversations, include_nested_associations: true
  has_many :posts, include_nested_associations: true

end
