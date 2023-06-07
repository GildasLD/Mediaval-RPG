class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.text :quests, array: true, null: true, default: []
      t.text :completedQuests, array: true, null: true, default: []
      t.text :fights, array: true, null: true, default: []
      t.integer :image
      t.integer :level
      t.integer :lifePoints
      t.integer :points
      t.integer :strength
      t.integer :xp
      t.text :description
      t.references :user,
                   null: true,
                   foreign_key: true,
                   on_delete: :cascade,
                   on_update: :cascade
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
