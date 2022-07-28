class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :avatar_url, :bio

  belongs_to :user
end
