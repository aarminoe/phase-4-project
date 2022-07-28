class CreateGroups < ActiveRecord::Migration[6.1]
  def change
    create_table :groups do |t|
      t.string :name 
      t.integer :number_of_members
      t.integer :user_id
      t.timestamps
    end
  end
end
