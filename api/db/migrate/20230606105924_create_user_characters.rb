class CreateUserCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :user_characters do |t|
      t.references :user, null: false, foreign_key: true
      t.references :character, null: false, foreign_key: true, default: 1
      t.integer :helmet, default: 1
      t.integer :shield, default: 1
      t.integer :weapon, default: 1
      t.integer :level, default: 1
      t.integer :lifePoints, default: 100
      t.integer :points, default: 1
      t.integer :strength, default: 100
      t.integer :defense, default: 1
      t.integer :xp, default: 1
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
