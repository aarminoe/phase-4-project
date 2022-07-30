class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message, :user_who_messaged

  belongs_to :user
end
