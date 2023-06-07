class CreateOpponents < ActiveRecord::Migration[7.0]
  def change
    create_table :opponents do |t|
      t.string :name
      t.text :description
      t.integer :helmet
      t.integer :level
      t.integer :lifePoints
      t.integer :shield
      t.integer :strength
      t.integer :weapon
      t.string :image
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
