class CreatePostLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :post_likes do |t|
      t.string :user_who_liked
      t.integer :post_id
      t.timestamps
    end
  end
end
