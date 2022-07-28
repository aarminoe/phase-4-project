class CreateCommentLikes < ActiveRecord::Migration[6.1]
  def change
    create_table :comment_likes do |t|
      t.string :user_who_liked
      t.integer :comment_id

      t.timestamps
    end
  end
end
