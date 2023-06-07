class Quest < ApplicationRecord
  has_many :stages
  has_many :riddles
end
