class CreateQuests < ActiveRecord::Migration[7.0]
  def change
    create_table :quests do |t|
      t.string :name
      t.text :description
      t.integer :duration
      t.text :image
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
