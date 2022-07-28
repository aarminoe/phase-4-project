class GroupSerializer < ActiveModel::Serializer
  attributes :id, :name, :number_of_members

  belongs_to :user
end
