class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :number_of_members

  has_many :users
  has_many :group_messages
end
