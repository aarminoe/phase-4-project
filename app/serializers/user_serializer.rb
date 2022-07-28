class UserSerializer < ActiveModel::Serializer
  attributes :id, :name

  has_many :friends 
  has_many :posts, include_nested_associations: true


end
