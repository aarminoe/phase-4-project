class CreateFriends < ActiveRecord::Migration[6.1]
  def change
    create_table :friends do |t|
      t.string :username
      t.string :avatar_url
      t.string :bio
      t.integer :user_id
      t.timestamps
    end
  end
end
