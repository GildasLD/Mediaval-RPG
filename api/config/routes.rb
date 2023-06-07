Rails.application.routes.draw do
  resources :quests
  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  resources :quests
  delete "/quests/:id", to: "quests#destroy"
  get "/quests", to: "quests#index"
  get "/quests/:id", to: "quests#show"
  post "/quests/create", to: "quests#create"
  put "/quests/:id", to: "quests#update"

  get 'current_user', to: 'users#current'
end
