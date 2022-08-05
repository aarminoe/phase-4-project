class CreateGroupMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :group_messages do |t|
      t.string :message
      t.string :sender_name
      t.string :sender_avatar_url
      t.integer :group_id
      t.integer :user_id
      t.timestamps
    end
  end
end
