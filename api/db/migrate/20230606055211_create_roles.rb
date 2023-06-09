class CreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :roles do |t|
      # t.string :role
      t.string :role, null: false #, default: "Player"

      t.text :description
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
