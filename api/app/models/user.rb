class User < ApplicationRecord
  attr_accessor :login
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable
  validates :username, presence: true, uniqueness: { case_sensitive: false }
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  has_many :user_characters
  has_many :characters, through: :user_characters
  has_one :role
  has_one :inventory
  after_create :initialize_inventory
  def self.find_for_database_authentication(warden_conditions)
    conditions = warden_conditions.dup
    login = conditions.delete(:login)
    where(conditions).where(
      [
        "lower(username) = :value OR lower(email) = :value",
        { value: login.strip.downcase }
      ]
    ).first
  end

  private

  def initialize_inventory
    create_inventory!(money: 300, helmet: 0, shield: 1, weapon: 0)
  end
end
