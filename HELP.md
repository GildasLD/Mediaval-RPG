bundle add bundler prettier_print syntax_tree syntax_tree-haml syntax_tree-rbs
bundle add devise
bundle add rails
bundle add rails --no-document
bundle install --gemfile=Gemfile
gem add rails --no-document
gem install rails
gem install rails --no-document
rails --help
rails --version
rails credentials:edit
rails db:create
rails db:migrate
rails db:seed
rails generate controller Quests
rails generate devise User
rails generate devise:install
rails generate model Equipment name:string description:text image:string
rails generate model Inventory name:string description:text image:string
rails generate model non_player_character stage:references life:integer strength:integer
rails generate model Opponent name:string description:text image:string
rails generate model Quest name:string description:text user:references
rails generate model Quest name:string description:text user:references;
rails generate model Riddle stage:references question:text answer:string
rails generate model Stage quest:references description:text
rails new appname -d=postgresql
rails new appname -d=sqlite3
rails new rails-appname -d=postgresql
rails new rpg_community
rails s
rails server
rails:db migrate
ruby -v rails -v