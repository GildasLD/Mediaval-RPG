class UserCharacter < ApplicationRecord
  belongs_to :user
  belongs_to :character
  after_create :reset_equipment_values

  private

  def reset_equipment_values
    update(helmet: 0, shield: 0, weapon: 0)
  end
end
