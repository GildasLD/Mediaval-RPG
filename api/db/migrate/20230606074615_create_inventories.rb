class CreateInventories < ActiveRecord::Migration[7.0]
  def change
    create_table :inventories do |t|
      ## User
      t.references :user, null: true, foreign_key: true
      t.integer :money, default: 250
      t.integer :helmet, default: 1
      t.integer :shield, default: 1
      t.integer :weapon, default: 1
      t.text :items, array: true, null: true, default: []
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
