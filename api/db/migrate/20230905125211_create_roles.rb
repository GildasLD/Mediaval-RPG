class CreateRoles < ActiveRecord::Migration[7.0]
  def change
    create_table :roles do |t|
      t.string :role
      t.text :description
      t.references :user, null: true, foreign_key: true
      t.timestamps default: -> { 'CURRENT_TIMESTAMP' }
    end
  end
end
