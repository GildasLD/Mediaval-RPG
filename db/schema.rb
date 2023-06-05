# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_09_05_125211) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "equipment", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.string "image"
    t.integer "helmet"
    t.integer "shield"
    t.integer "weapon"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
  end

  create_table "inventories", force: :cascade do |t|
    t.integer "helmet"
    t.integer "level"
    t.integer "lifePoints"
    t.integer "shield"
    t.integer "strength"
    t.integer "weapon"
    t.string "image"
    t.string "name"
    t.text "description"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
  end

  create_table "non_player_characters", force: :cascade do |t|
    t.bigint "stage_id", null: false
    t.integer "life"
    t.integer "strength"
    t.integer "helmet"
    t.integer "level"
    t.integer "shield"
    t.integer "weapon"
    t.string "image"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["stage_id"], name: "index_non_player_characters_on_stage_id"
  end

  create_table "opponents", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.integer "helmet"
    t.integer "level"
    t.integer "lifePoints"
    t.integer "shield"
    t.integer "strength"
    t.integer "weapon"
    t.string "image"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
  end

  create_table "quests", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.bigint "user_id", null: false
    t.integer "duration"
    t.integer "experience"
    t.integer "opponent"
    t.integer "riddles"
    t.integer "imageId"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["user_id"], name: "index_quests_on_user_id"
  end

  create_table "riddles", force: :cascade do |t|
    t.bigint "stage_id", null: false
    t.text "question"
    t.text "firstSuggestion"
    t.text "secondSuggestion"
    t.text "thirdSuggestion"
    t.text "fourthSuggestion"
    t.text "answer"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["stage_id"], name: "index_riddles_on_stage_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "role"
    t.text "description"
    t.bigint "user_id"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["user_id"], name: "index_roles_on_user_id"
  end

  create_table "stages", force: :cascade do |t|
    t.bigint "quest_id", null: false
    t.text "description"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["quest_id"], name: "index_stages_on_quest_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "username", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "role", default: "Player"
    t.integer "quests", default: [], array: true
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "non_player_characters", "stages"
  add_foreign_key "quests", "users"
  add_foreign_key "riddles", "stages"
  add_foreign_key "roles", "users"
  add_foreign_key "stages", "quests"
end
