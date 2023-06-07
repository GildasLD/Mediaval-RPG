class CreateEquipment < ActiveRecord::Migration[7.0]
  def change
    create_table :equipment do |t|
      t.string :name
      t.text :description
      t.string :image
      t.integer :helmet
      t.integer :shield
      t.integer :weapon
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
