class ConversationSerializer < ActiveModel::Serializer
  attributes :id, :conversation_with

  has_many :messages, include_nested_associations: true
  belongs_to :user
end
