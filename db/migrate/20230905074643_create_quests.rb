class CreateQuests < ActiveRecord::Migration[7.0]
  def change
    create_table :quests do |t|
      t.string :name
      t.text :description
      t.references :user, null: false, foreign_key: true
      t.integer :duration
      t.integer :experience
      t.integer :opponent
      t.integer :riddles
      t.integer :imageId
      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
    end
  end
end
