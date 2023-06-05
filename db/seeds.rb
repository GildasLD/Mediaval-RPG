# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
# User.create!(
#   email: 'gildas.le-drogoff@epitech.eu',
#   username: 'GildasLD',
#   password: 'bob',
#   password_confirmation: 'bob'
# )

roles = [{ role: "Player" }, { role: "Admin" }, { role: "GameMaster" }]
roles.each { |role| Role.create!(role) }

users = [
  {
    email: "gildas.le-drogoff+player@epitech.eu",
    username: "GildasLD-player",
    password: "bob",
    password_confirmation: "bob",
    role: "Player"
  },
  {
    email: "gildas.le-drogoff+admin@epitech.eu",
    username: "GildasLD-admin",
    password: "bob",
    password_confirmation: "bob",
    role: "Admin"
  },
  {
    email: "gildas.le-drogoff+GameMaster@epitech.eu",
    username: "GildasLD-GameMaster",
    password: "bob",
    password_confirmation: "bob",
    role: "GameMaster"
  }
]
users.each { |user| User.create!(user) }

quests = [
  { name: "First quest", description: "Quest description", user_id: 1 },
  { name: "Second quest", description: "Second quest description", user_id: 1 }
]
quests.each { |quest| Quest.create!(quest) }
