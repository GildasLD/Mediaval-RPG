Rails.application.routes.draw do
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :shop_items
  get "/shop_items", to: "shop_items#index"
  get "/shop_items/:id", to: "shop_items#show"
  post "/shop_items/create", to: "shop_items#create"
  post "/shop_items/buy", to: "shop_items#buyItem"
  resources :characters, only: %i[new index show create destroy]
  get "/characters", to: "characters#index"
  get "/characters/player/:id", to: "characters#charactersPlayer"
  get "/characters/choose/:id", to: "characters#chooseCharater"
  post "/characters/create", to: "characters#create"
  put "/characters/updatePV/:id", to: "characters#updatePVStats"
  put "/characters/updateSTR/:id", to: "characters#updateSTRStats"
  put "/characters/updateXP", to: "characters#updateXPStats"
  post "/characters/acceptQuest/:id/:quest", to: "characters#acceptQuest"
  post "/characters/inventory/:id", to: "characters#getInventory"
  post "/characters/updateCharacterAfterWin/:idChar/:idQuest",
       to: "characters#updateCharacterAfterWin"
  resources :stats
  resources :oponents
  get "/oponents", to: "oponents#index"
  get "/oponents/:id", to: "oponents#show"
  post "/oponents/create", to: "oponents#create"
  delete "/oponents/:id", to: "oponents#destroy"
  resources :enigmes
  get "/enigmes", to: "enigmes#index"
  get "/enigmes/:id", to: "enigmes#show"
  post "/enigmes/create", to: "enigmes#create"
  delete "/enigmes/:id", to: "enigmes#destroy"
  resources :pnjs
  get "/pnjs", to: "pnjs#index"
  get "/pnjs/:id", to: "pnjs#show"
  post "/pnjs/create", to: "pnjs#create"
  delete "/pnjs/:id", to: "pnjs#destroy"
  resources :quests
  get "/quests", to: "quests#index"
  get "/quests/:id", to: "quests#show"
  post "/quests/create", to: "quests#create"
  delete "/quests/:id", to: "quests#destroy"
  put "/quests/:id", to: "quests#update"
  resources :items
  get "/items", to: "items#index"
  get "/items/:id", to: "items#show"
  post "/helmets", to: "items#getHelmet"
  post "/weapons", to: "items#getWeapon"
  post "/shields", to: "items#getShield"
  post "/items/create", to: "items#createItem"
  post "/items/buy", to: "items#buyItem"
  post "/items/sell", to: "items#sellItem"
  post "/items/destroy", to: "items#destroyItem"
  resources :inventories
  get "/inventories", to: "inventories#index"
  post "/inventories/addItem", to: "inventories#addItem"
  post "/inventories/deleteItem", to: "inventories#deleteItem"
  post "/inventories/addGold", to: "inventories#addGold"
  resources :roles, only: %i[new index]
  resources :players, only: %i[new index destroy]
  post "/players/create", to: "players#create"
  post "/players/login", to: "players#login"
  put "players/update", to: "players#updateEmail"
  get "players/:id", to: "players#show"
end
