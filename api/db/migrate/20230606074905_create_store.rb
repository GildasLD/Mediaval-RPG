class CreateStore < ActiveRecord::Migration[7.0]
  def change
    create_table :store do |t|
      t.string :image
      t.integer :charisma
      t.integer :defense
      t.integer :gold
      t.integer :helmet
      t.integer :intelligence
      t.integer :shield
      t.integer :speed
      t.integer :strength
      t.integer :weapon
      t.integer :wisdom
    end
  end
end
