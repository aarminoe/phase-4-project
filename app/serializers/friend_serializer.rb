class FriendSerializer < ActiveModel::Serializer
  attributes :id, :username, :user_id, :avatar_url, :bio

  belongs_to :user
end
