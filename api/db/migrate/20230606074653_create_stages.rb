class CreateStages < ActiveRecord::Migration[7.0]
  def change
    create_table :stages do |t|
      t.references :quest, null: false, foreign_key: true
      t.text :description
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
