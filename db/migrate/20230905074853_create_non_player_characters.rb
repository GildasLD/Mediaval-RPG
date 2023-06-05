class CreateNonPlayerCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :non_player_characters do |t|
      t.references :stage, null: false, foreign_key: true
      t.integer :life
      t.integer :strength
      t.integer :helmet
      t.integer :level
      t.integer :shield
      t.integer :weapon
      t.string :image
      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
    end
  end
end
