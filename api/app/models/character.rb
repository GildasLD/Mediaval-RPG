class Character < ApplicationRecord
  has_many :user_characters
  has_many :non_player_characters
  has_many :users, through: :user_characters
end
