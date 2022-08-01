class FriendSerializer < ActiveModel::Serializer
  attributes :username, :user_id, :avatar_url, :bio
end
