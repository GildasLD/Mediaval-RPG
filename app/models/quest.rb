class Quest < ApplicationRecord
  belongs_to :user
  has_many :stages
end
