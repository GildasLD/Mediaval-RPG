class NonPlayerCharacter < ApplicationRecord
  belongs_to :stage
  belongs_to :character
  has_one :inventory
end
