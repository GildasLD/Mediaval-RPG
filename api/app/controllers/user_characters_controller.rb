class UserCharactersController < ApplicationController
  before_action :set_user_character, only: %i[show update destroy]
  def index
    @user_characters = UserCharacter.all
    render json:
             @user_characters.eager_load(:character).as_json(
               include: {
                 character: {
                   only: %i[id name image description]
                 }
               }
             )
  end

  def show
    @user_characters = UserCharacter.where(user: params[:id])
    render json:
             @user_characters.eager_load(:character).as_json(
               include: {
                 character: {
                   only: %i[id name image description]
                 }
               }
             )
  end

  def create
    user_character_params = user_character_params()
    character_attributes = user_character_params.delete(:character)
    character = Character.find_or_create_by(character_attributes)
    user_character =
      UserCharacter.new(user_character_params.merge(character: character))

    if user_character.save
      # Inventory.create(user: user_character.user)

      @user_characters = UserCharacter.where(id: user_character.id)
      render json:
               @user_characters.eager_load(:character).as_json(
                 include: :character
               )
    else
      render json: user_character.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /user_characters/:id
  def update
    if sufficient_money_and_items?
      update_values = user_character_params
      update_values.each { |key, value| @user_character[key] += value.to_i }

      if @user_character.save
        render json: @user_character, status: :ok
      else
        render json: @user_character.errors, status: :unprocessable_entity
      end
    else
      render json: {
               error: "user_characters : Insufficient money or items !"
             },
             status: :bad_request
    end
  end

  def getOneUserCaracter
    @user_character = UserCharacter.find_by(user_character: params[:id])
    render json: @user_character
  end

  def destroy
    @user_character = UserCharacter.find_by(user_character: params[:id])
    Inventory.find_by(id: @user_character.id)&.destroy
    @user_character.destroy
    render json: @user_character, status: :not_found
  end

  def getInventory
    @user_character = UserCharacter.find_by(user_character: params[:id])
    puts @user_character.inspect
    @inventory = Inventory.find(@user_character.inventory)
    render json: @inventory
  end

  private

  def update_params
    params.require(:user_character).permit!
  end
  def sufficient_money_and_items?
    update_params.to_h.all? do |key, value|
      int_value = value.to_i
      int_value.negative? ? @user_character[key].to_i + value >= 0 : true
    end
  end

  def set_user_character
    @user_character =
      UserCharacter.find_by(character_id: params[:id] || params[:character_id])
    unless @user_character
      render json: { error: "UserCharacter not found" }, status: :not_found
    end
  end

  def character_params
    params.require(:user_character).permit!
  end

  def user_character_params
    params.require(:user_character).permit!
  end
end
