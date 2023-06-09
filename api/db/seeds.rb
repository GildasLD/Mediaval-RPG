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

inventories = [
  { helmet: 1, shield: 1, weapon: 1 },
  { helmet: 1, shield: 1, weapon: 1 },
  { helmet: 1, shield: 1, weapon: 1 },
  { helmet: 1, shield: 1, weapon: 1 },
  { helmet: 1, shield: 1, weapon: 1 },
  { helmet: 1, shield: 1, weapon: 1 },
  { helmet: 1, shield: 1, weapon: 1 }
]
inventories.each { |inventory| Inventory.create!(inventory) }

users = [
  {
    email: "gildas.le-drogoff@epitech.eu",
    username: "GildasLD",
    password: "bob",
    password_confirmation: "bob",
    role_id: 1,
    inventory_id: 1
  },
  {
    email: "gildas.le-drogoff+player@epitech.eu",
    username: "GildasLD-player",
    password: "bob",
    password_confirmation: "bob",
    role_id: 1,
    inventory_id: 2
  },
  {
    email: "gildas.le-drogoff+admin@epitech.eu",
    username: "GildasLD-admin",
    password: "bob",
    password_confirmation: "bob",
    role_id: 2,
    inventory_id: 3
  },
  {
    email: "gildas.le-drogoff+GameMaster@epitech.eu",
    username: "GildasLD-GameMaster",
    password: "bob",
    password_confirmation: "bob",
    role_id: 3,
    inventory_id: 4
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
  { name: "Erna Jason", image: 1 },
  { name: "Cupido Sobek", image: 2 },
  { name: "Lucifer Hel", image: 3 },
  { name: "Mars Hippolyte", image: 4 },
  { name: "Eunomia Longwang", image: 5 }
]
characters.each { |character| Character.create!(character) }

non_player_characters = [
  {
    stage_id: 2,
    character_id: 5,
    level: 5,
    lifePoints: 100,
    points: 0,
    strength: 100,
    wisdom: 0,
    xp: 100,
    inventory_id: 2
  },
  {
    stage_id: 2,
    character_id: 2,
    level: 5,
    lifePoints: 100,
    points: 0,
    strength: 100,
    wisdom: 0,
    xp: 100,
    inventory_id: 1
  },
  {
    stage_id: 1,
    character_id: 1,
    level: 1,
    lifePoints: 50,
    points: 0,
    strength: 50,
    wisdom: 0,
    xp: 50,
    inventory_id: 3
  }
]

non_player_characters.each do |non_player_character|
  NonPlayerCharacter.create!(non_player_character)
end

user_characters = [
  {
    user_id: 1,
    character_id: 5,
    level: 5,
    lifePoints: 100,
    points: 0,
    strength: 100,
    wisdom: 0,
    xp: 100
  },
  {
    user_id: 1,
    character_id: 2,
    level: 5,
    lifePoints: 100,
    points: 0,
    strength: 100,
    wisdom: 0,
    xp: 100
  },
  {
    user_id: 2,
    character_id: 1,
    level: 1,
    lifePoints: 50,
    points: 0,
    strength: 50,
    wisdom: 0,
    xp: 50
  }
]

user_characters.each { |user_character| UserCharacter.create!(user_character) }
