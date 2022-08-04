class CreateMessages < ActiveRecord::Migration[6.1]
  def change
    create_table :messages do |t|
      t.string :message
      t.string :who_messaged
      t.integer :conversation_id
      t.timestamps
    end
  end
end
