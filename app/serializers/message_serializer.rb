class MessageSerializer < ActiveModel::Serializer
  attributes :id, :message, :who_messaged

  belongs_to :conversation
end
