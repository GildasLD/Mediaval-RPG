class CreateNonPlayerCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :non_player_characters do |t|
      t.references :stage, null: false, foreign_key: true
      t.references :character, null: false, foreign_key: true
      t.references :inventory, null: true, foreign_key: true
      t.integer :helmet
      t.integer :shield
      t.integer :weapon
      t.integer :level
      t.integer :lifePoints
      t.integer :points
      t.integer :strength
      t.integer :defense
      t.integer :xp
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
