class CreateInventories < ActiveRecord::Migration[7.0]
  def change
    create_table :inventories do |t|
      t.integer :money, default: 250
      t.integer :helmet
      t.integer :shield
      t.integer :weapon
      t.text :items, array: true, null: true, default: []
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
