class CreateCharacters < ActiveRecord::Migration[7.0]
  def change
    create_table :characters do |t|
      t.string :name
      t.integer :image, default: 1
      t.text :description
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
