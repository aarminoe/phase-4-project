class CreateConversations < ActiveRecord::Migration[6.1]
  def change
    create_table :conversations do |t|
      t.string :conversation_with
      t.integer :user_id
      t.timestamps
    end
  end
end
