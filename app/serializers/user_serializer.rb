class UserSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_one :profile
  has_many :friends
  has_many :groups
  has_many :posts, include_nested_associations: true

end
