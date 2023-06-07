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
    email: "gildas.le-drogoff@epitech.eu",
    username: "GildasLD",
    password: "bob",
    password_confirmation: "bob",
    role: "Player"
  },
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
  {
    name: "Become your inner dragon",
    description: "Become your inner dragon",
    user_id: 1
  },
  {
    name: "Become your inner squirrel",
    description: "Become your inner squirrel",
    user_id: 1
  }
]
quests.each { |quest| Quest.create!(quest) }

stages = [
  { quest_id: 1, description: "First stage" },
  { quest_id: 1, description: "Second stage" }
]
stages.each { |stage| Stage.create!(stage) }

riddles = [
  {
    stage_id: 1,
    question:
      "Je parle sans bouche et j'entends sans oreilles. Je n'ai pas de corps, mais je m'anime au gré du vent. Qu'est-ce que je suis ?",
    firstSuggestion: "Un nuage",
    secondSuggestion: "Une ombre",
    thirdSuggestion: "Un écho",
    fourthSuggestion: "Une feuille",
    answer: "Un écho"
  },
  {
    stage_id: 1,
    question:
      "Je vole sans ailes. Je pleure sans yeux. Chaque fois que je vais, les ténèbres s'envolent. Que suis-je ?",
    firstSuggestion: "Une chauve-souris",
    secondSuggestion: "Un nuage",
    thirdSuggestion: "Une larme",
    fourthSuggestion: "La nuit",
    answer: "La nuit"
  },
  {
    stage_id: 1,
    question:
      "On me prend dans une mine et on m'enferme dans une caisse en bois, dont je ne sors jamais, et pourtant je suis utilisé par presque tout le monde. Qu'est-ce que je suis ?",
    firstSuggestion: "De l'or",
    secondSuggestion: "Un canari",
    thirdSuggestion: "Une mine de plomb",
    fourthSuggestion: "Un diamant",
    answer: "La mine de plomb"
  },
  {
    stage_id: 1,
    question: "Plus on en prend, plus on en laisse. Qu\'est-ce que je suis ?",
    firstSuggestion: "De l'argent",
    secondSuggestion: "Des pas",
    thirdSuggestion: "Le temps",
    fourthSuggestion: "Les rêves",
    answer: "Les pas"
  },
  {
    stage_id: 1,
    question:
      "Qu'est-ce qui arrive une fois en une minute, deux fois en un instant, mais jamais en mille ans ?",
    firstSuggestion: "La lettre A",
    secondSuggestion: "La lettre M",
    thirdSuggestion: "Le chiffre 1",
    fourthSuggestion: "La lettre Z",
    answer: "La lettre M"
  }
]

riddles.each { |riddle| Riddle.create!(riddle) }
