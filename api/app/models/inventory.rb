class Inventory < ApplicationRecord
  belongs_to :user, optional: true
end
