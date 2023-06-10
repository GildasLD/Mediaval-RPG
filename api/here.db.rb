User.create!(
  [
    {
      email: "gildas.le-drogoff@epitech.eu",
      username: "GildasLD",
      encrypted_password:
        "$2a$12$yH32pTW20yCVbcyRVUieeeuxTaU7RBh4sIiNNK8MzLaIzunoKso66",
      role_id: 1,
      characters: [],
      xp: nil,
      quests: [],
      completedQuests: [],
      fights: [],
      riddles: [],
      reset_password_token: nil,
      reset_password_sent_at: nil,
      remember_created_at: nil,
      sign_in_count: 0,
      current_sign_in_at: nil,
      last_sign_in_at: nil,
      current_sign_in_ip: nil,
      last_sign_in_ip: nil
    },
    {
      email: "gildas.le-drogoff+player@epitech.eu",
      username: "GildasLD-player",
      encrypted_password:
        "$2a$12$Zx4/bJ3sapuaZJ5McFChrOEJXvlv/TnWo3v/JdbeEhVQgEy06cRue",
      role_id: 1,
      characters: [],
      xp: nil,
      quests: [],
      completedQuests: [],
      fights: [],
      riddles: [],
      reset_password_token: nil,
      reset_password_sent_at: nil,
      remember_created_at: nil,
      sign_in_count: 0,
      current_sign_in_at: nil,
      last_sign_in_at: nil,
      current_sign_in_ip: nil,
      last_sign_in_ip: nil
    },
    {
      email: "gildas.le-drogoff+admin@epitech.eu",
      username: "GildasLD-admin",
      encrypted_password:
        "$2a$12$5Ebomts7NkEL0laY3bG.R.vwfQ0qDjHAVvlsHpeqOXDjZ7SCFFdF6",
      role_id: 2,
      characters: [],
      xp: nil,
      quests: [],
      completedQuests: [],
      fights: [],
      riddles: [],
      reset_password_token: nil,
      reset_password_sent_at: nil,
      remember_created_at: nil,
      sign_in_count: 0,
      current_sign_in_at: nil,
      last_sign_in_at: nil,
      current_sign_in_ip: nil,
      last_sign_in_ip: nil
    },
    {
      email: "gildas.le-drogoff+gamemaster@epitech.eu",
      username: "GildasLD-GameMaster",
      encrypted_password:
        "$2a$12$kEPnewmu4oDNvVPLaAsS7e2Mlwg0Ny5RgQceSSZKFs.SHeIKOGP82",
      role_id: 3,
      characters: [],
      xp: nil,
      quests: [],
      completedQuests: [],
      fights: [],
      riddles: [],
      reset_password_token: nil,
      reset_password_sent_at: nil,
      remember_created_at: nil,
      sign_in_count: 0,
      current_sign_in_at: nil,
      last_sign_in_at: nil,
      current_sign_in_ip: nil,
      last_sign_in_ip: nil
    }
  ]
)
Character.create!(
  [
    { name: "Erna Jason", image: 1, description: nil },
    { name: "Cupido Sobek", image: 2, description: nil },
    { name: "Lucifer Hel", image: 3, description: nil },
    { name: "Mars Hippolyte", image: 4, description: nil },
    { name: "Eunomia Longwang", image: 5, description: nil }
  ]
)
Inventory.create!(
  [
    {
      user_id: 1,
      money: 300,
      helmet: 100,
      shield: 100,
      weapon: 100,
      items: []
    },
    {
      user_id: 2,
      money: 300,
      helmet: 100,
      shield: 100,
      weapon: 100,
      items: []
    },
    {
      user_id: 3,
      money: 300,
      helmet: 100,
      shield: 100,
      weapon: 100,
      items: []
    },
    { user_id: 4, money: 300, helmet: 100, shield: 100, weapon: 100, items: [] }
  ]
)
NonPlayerCharacter.create!(
  [
    {
      stage_id: 2,
      character_id: 5,
      inventory_id: 2,
      helmet: nil,
      shield: nil,
      weapon: nil,
      level: 5,
      lifePoints: 100,
      points: 0,
      strength: 100,
      defense: 0,
      xp: 100
    },
    {
      stage_id: 2,
      character_id: 2,
      inventory_id: 1,
      helmet: nil,
      shield: nil,
      weapon: nil,
      level: 5,
      lifePoints: 100,
      points: 0,
      strength: 100,
      defense: 0,
      xp: 100
    },
    {
      stage_id: 1,
      character_id: 1,
      inventory_id: 3,
      helmet: nil,
      shield: nil,
      weapon: nil,
      level: 1,
      lifePoints: 50,
      points: 0,
      strength: 50,
      defense: 0,
      xp: 50
    }
  ]
)
Quest.create!(
  [
    { name: "dragon", description: "Dragon", duration: nil, image: "dragon" },
    {
      name: "squirrel",
      description: "Squirell",
      duration: nil,
      image: "squirell"
    },
    { name: "lizard", description: "Lizard", duration: nil, image: "lizard" }
  ]
)
Riddle.create!(
  [
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
      question: "Plus on en prend, plus on en laisse. Qu'est-ce que je suis ?",
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
)
Role.create!(
  [
    { role: "Player", description: nil },
    { role: "Admin", description: nil },
    { role: "GameMaster", description: nil }
  ]
)
Stage.create!(
  [
    { quest_id: 1, description: "First stage" },
    { quest_id: 1, description: "Second stage" },
    { quest_id: 2, description: "First stage" },
    { quest_id: 2, description: "Second stage" },
    { quest_id: 3, description: "First stage" },
    { quest_id: 3, description: "Second stage" }
  ]
)
UserCharacter.create!(
  [
    {
      user_id: 2,
      character_id: 5,
      helmet: 0,
      shield: 0,
      weapon: 0,
      level: 1,
      lifePoints: 50,
      points: 0,
      strength: 50,
      defense: 0,
      xp: 200
    },
    {
      user_id: 1,
      character_id: 1,
      helmet: 0,
      shield: 0,
      weapon: 3,
      level: 5,
      lifePoints: 100,
      points: 0,
      strength: 200,
      defense: 0,
      xp: 50
    },
    {
      user_id: 1,
      character_id: 2,
      helmet: 20,
      shield: 20,
      weapon: 11,
      level: 5,
      lifePoints: 100,
      points: 0,
      strength: 100,
      defense: 0,
      xp: 100
    }
  ]
)
