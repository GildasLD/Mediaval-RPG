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

ActiveRecord::Schema[7.0].define(version: 2023_06_06_112833) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "characters", force: :cascade do |t|
    t.string "name"
    t.integer "image", default: 1
    t.text "description"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
  end

  create_table "inventories", force: :cascade do |t|
    t.bigint "user_id"
    t.integer "money", default: 250
    t.integer "helmet", default: 1
    t.integer "shield", default: 1
    t.integer "weapon", default: 1
    t.text "items", default: [], array: true
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["user_id"], name: "index_inventories_on_user_id"
  end

  create_table "non_player_characters", force: :cascade do |t|
    t.bigint "stage_id", null: false
    t.bigint "character_id", null: false
    t.bigint "inventory_id"
    t.integer "helmet"
    t.integer "shield"
    t.integer "weapon"
    t.integer "level"
    t.integer "lifePoints"
    t.integer "points"
    t.integer "strength"
    t.integer "defense"
    t.integer "xp"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["character_id"], name: "index_non_player_characters_on_character_id"
    t.index ["inventory_id"], name: "index_non_player_characters_on_inventory_id"
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
    t.integer "duration"
    t.text "image"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
  end

  create_table "riddles", force: :cascade do |t|
    t.bigint "quest_id", null: false
    t.bigint "stage_id", null: false
    t.text "question"
    t.text "firstSuggestion"
    t.text "secondSuggestion"
    t.text "thirdSuggestion"
    t.text "fourthSuggestion"
    t.text "answer"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["quest_id"], name: "index_riddles_on_quest_id"
    t.index ["stage_id"], name: "index_riddles_on_stage_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "role", null: false
    t.text "description"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
  end

  create_table "stages", force: :cascade do |t|
    t.bigint "quest_id", null: false
    t.text "description"
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["quest_id"], name: "index_stages_on_quest_id"
  end

  create_table "store", force: :cascade do |t|
    t.string "image"
    t.integer "charisma"
    t.integer "defense"
    t.integer "gold"
    t.integer "helmet"
    t.integer "intelligence"
    t.integer "shield"
    t.integer "speed"
    t.integer "strength"
    t.integer "weapon"
  end

  create_table "user_characters", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "character_id", default: 1, null: false
    t.integer "helmet", default: 1
    t.integer "shield", default: 1
    t.integer "weapon", default: 1
    t.integer "level", default: 1
    t.integer "lifePoints", default: 100
    t.integer "points", default: 1
    t.integer "strength", default: 100
    t.integer "defense", default: 1
    t.integer "xp", default: 1
    t.datetime "created_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.datetime "updated_at", default: -> { "CURRENT_TIMESTAMP" }, null: false
    t.index ["character_id"], name: "index_user_characters_on_character_id"
    t.index ["user_id"], name: "index_user_characters_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: ""
    t.string "username", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.bigint "role_id", default: 1, null: false
    t.integer "characters", default: [], array: true
    t.integer "xp"
    t.integer "quests", default: [], array: true
    t.integer "completedQuests", default: [], array: true
    t.integer "fights", default: [], array: true
    t.integer "riddles", default: [], array: true
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string "current_sign_in_ip"
    t.string "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["role_id"], name: "index_users_on_role_id"
    t.index ["username"], name: "index_users_on_username", unique: true
  end

  add_foreign_key "inventories", "users"
  add_foreign_key "non_player_characters", "characters"
  add_foreign_key "non_player_characters", "inventories"
  add_foreign_key "non_player_characters", "stages"
  add_foreign_key "riddles", "quests"
  add_foreign_key "riddles", "stages"
  add_foreign_key "stages", "quests"
  add_foreign_key "user_characters", "characters"
  add_foreign_key "user_characters", "users"
  add_foreign_key "users", "roles"
end
