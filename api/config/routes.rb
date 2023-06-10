Rails.application.routes.draw do
  devise_for :users,
             controllers: {
               sessions: "users/sessions",
               registrations: "users/registrations"
             }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  # Users
  # get "/users/current_user", to: "users#current"
  # post "/users/me", to: "users#check_token"
  resources :users
  get "users/", to: "users#index"
  get "users/:id", to: "users#show"
  put "users/:id/update", to: "users#update"
  resources :users do
    resources :inventories, only: %i[index new create update]
  end
  resources :users, shallow: true do
    resources :inventories, shallow: true
  end

  # Inventories
  resources :inventories, defaults: { format: :json }
  get "/inventories", to: "inventories#index"
  get "/inventories/:id", to: "inventories#show"
  post "/inventories", to: "inventories#create"
  patch "/inventories/:id", to: "inventories#update"
  # Quests
  resources :quests
  delete "/quests/:id", to: "quests#destroy"
  get "/quests", to: "quests#index"
  get "/quests/:id", to: "quests#show"
  post "/quests/create", to: "quests#create"
  put "/quests/:id", to: "quests#update"

  # Riddles
  resources :riddles, only: [:index]
  delete "/riddles/:id", to: "riddles#destroy"
  get "/riddles", to: "riddles#index"
  get "/riddles/:id", to: "riddles#show"
  post "/riddles/create", to: "riddles#create"
  put "/riddles/:id", to: "riddles#update"

  # Characters
  resources :characters, only: %i[new index show create destroy]
  get "/characters", to: "characters#index"
  get "/characters/pick/:id", to: "characters#pickCharacter"
  get "/characters/user/:id", to: "characters#charactersUser"
  post "/characters/acceptQuest/:id/:quest", to: "characters#acceptQuest"
  post "/characters/create", to: "characters#create"
  post "/characters/inventory/:id", to: "characters#getInventory"
  post "/characters/updateCharacter/:idChar/:idQuest",
       to: "characters#updateCharacter"
  put "/characters/updateLifePoints/:id", to: "characters#updateLifePoints"
  put "/characters/updateStrength/:id", to: "characters#updateStrength"
  put "/characters/updateXp", to: "characters#updateXp"

  # User Characters
  resources :user_characters #, defaults: { format: :json }
  get "/user_characters", to: "user_characters#index"
  get "/user_characters/:id", to: "user_characters#show"
  post "/user_characters/create", to: "user_characters#create"
  patch "/user_characters/:id", to: "user_characters#update"
end
