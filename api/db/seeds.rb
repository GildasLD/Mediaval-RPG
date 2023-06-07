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
  { name: "dragon", description: "Dragon", image: "dragon" },
  { name: "squirrel", description: "Squirell", image: "squirell" },
  { name: "lizard", description: "Lizard", image: "lizard" }
]
quests.each { |quest| Quest.create!(quest) }

stages = [
  { quest_id: 1, description: "First stage" },
  { quest_id: 1, description: "Second stage" },
  { quest_id: 2, description: "First stage" },
  { quest_id: 2, description: "Second stage" },
  { quest_id: 3, description: "First stage" },
  { quest_id: 3, description: "Second stage" }
]
stages.each { |stage| Stage.create!(stage) }

riddles = [
  {
    quest_id: 1,
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
    quest_id: 1,
    stage_id: 2,
    question:
      "Je vole sans ailes. Je pleure sans yeux. Chaque fois que je vais, les ténèbres s'envolent. Que suis-je ?",
    firstSuggestion: "Une chauve-souris",
    secondSuggestion: "Un nuage",
    thirdSuggestion: "Une larme",
    fourthSuggestion: "La nuit",
    answer: "La nuit"
  },
  {
    quest_id: 2,
    stage_id: 1,
    question:
      "On me prend dans une mine et on m'enferme dans une caisse en bois, dont je ne sors jamais, et pourtant je suis utilisé par presque tout le monde. Qu'est-ce que je suis ?",
    firstSuggestion: "De l'or",
    secondSuggestion: "Un canari",
    thirdSuggestion: "Une mine de plomb",
    fourthSuggestion: "Un diamant",
    answer: "Une mine de plomb"
  },
  {
    quest_id: 2,
    stage_id: 2,
    question: "Plus on en prend, plus on en laisse. Qu\'est-ce que je suis ?",
    firstSuggestion: "De l'argent",
    secondSuggestion: "Les pas",
    thirdSuggestion: "Le temps",
    fourthSuggestion: "Les rêves",
    answer: "Les pas"
  },
  {
    quest_id: 3,
    stage_id: 1,
    question:
      "Qu'est-ce qui arrive une fois en une minute, deux fois en un instant, mais jamais en mille ans ?",
    firstSuggestion: "La lettre A",
    secondSuggestion: "La lettre M",
    thirdSuggestion: "Le chiffre 1",
    fourthSuggestion: "La lettre Z",
    answer: "La lettre M"
  },
  {
    quest_id: 3,
    stage_id: 2,
    question:
      "La personne qui le fabrique le vend. La personne qui l'achète ne l'utilise jamais. La personne qui l'utilise ne sait jamais qu'elle l'utilise. Qu'est-ce que c'est ?",
    firstSuggestion: "Une maison",
    secondSuggestion: "Une chaussure",
    thirdSuggestion: "Un livre",
    fourthSuggestion: "Une tombe",
    answer: "Une tombe"
  }
]

riddles.each { |riddle| Riddle.create!(riddle) }

characters = [
  {
    name: "Erna Jason",
    level: 1,
    xp: 0,
    lifePoints: 100,
    strength: 15,
    points: 5,
    quests: [],
    fights: [],
    completedQuests: [],
    user_id: 1,
    image: 1
  },
  {
    name: "Cupido Sobek",
    level: 1,
    xp: 0,
    lifePoints: 100,
    strength: 15,
    points: 5,
    quests: [],
    fights: [],
    completedQuests: [],
    user_id: 1,
    image: 1
  },
  {
    name: "Lucifer Hel",
    level: 1,
    xp: 0,
    lifePoints: 100,
    strength: 15,
    points: 5,
    quests: [],
    fights: [],
    completedQuests: [],
    user_id: 1,
    image: 1
  },
  {
    name: "Mars Hippolyte",
    level: 1,
    xp: 0,
    lifePoints: 100,
    strength: 15,
    points: 5,
    quests: [],
    fights: [],
    completedQuests: [],
    user_id: 1,
    image: 1
  },
  {
    name: "Eunomia Longwang",
    level: 1,
    xp: 0,
    lifePoints: 100,
    strength: 15,
    points: 5,
    quests: [],
    fights: [],
    completedQuests: [],
    user_id: 1,
    image: 1
  }
]
characters.each { |character| Character.create!(character) }

inventories = [
  { helmet: 1, shield: 1, weapon: 1, character_id: 1 },
  { helmet: 1, shield: 1, weapon: 1, character_id: 2 },
  { helmet: 1, shield: 1, weapon: 1, character_id: 3 },
  { helmet: 1, shield: 1, weapon: 1, character_id: 4 },
  { helmet: 1, shield: 1, weapon: 1, character_id: 5 }
]
inventories.each { |inventory| Inventory.create!(inventory) }
