class CreateRiddles < ActiveRecord::Migration[7.0]
  def change
    create_table :riddles do |t|
      t.references :quest, null: false, foreign_key: true
      t.references :stage, null: false, foreign_key: true
      t.text :question
      t.text :firstSuggestion
      t.text :secondSuggestion
      t.text :thirdSuggestion
      t.text :fourthSuggestion
      t.text :answer
      t.timestamps default: -> { "CURRENT_TIMESTAMP" }
    end
  end
end
