class UserCharactersController < ApplicationController
  def index
    @user_characters = UserCharacter.all
    render json:
             @user_characters.eager_load(:character).as_json(
               include: :character
             )
  end

  def show
    @user_characters = UserCharacter.where(user: params[:id])
    render json:
             @user_characters.eager_load(:character).as_json(
               include: :character
             )
  end

  def create
    user_character_params = user_character_params()
    character_attributes = user_character_params.delete(:character)
    character = Character.find_or_create_by(character_attributes)
    user_character =
      UserCharacter.new(user_character_params.merge(character: character))
    if user_character.save
      @user_characters = UserCharacter.where(id: user_character.id)
      render json:
               @user_characters.eager_load(:character).as_json(
                 include: :character
               )
    else
      render json: user_character.errors, status: :unprocessable_entity
    end
  end

  def getOneUserCaracter
    @user_character = UserCharacter.find(params[:id])
    render json: @user_character
  end

  def updateLifePoints
    @user_character = UserCharacter.find(params[:id])
    if @user_character.points > 0
      @user_character.update(points: @user_character.points - 1)
      @user_character.update(lifePoints: @user_character.lifePoints + 1)
      render json: @user_character
    else
      render json: { errors: "Insufficient points" }, status: :bad_request
    end
  end

  def updateStrength
    @user_character = UserCharacter.find(params[:id])
    if @user_character.points > 0
      @user_character.update(points: @user_character.points - 1)
      @user_character.update(strength: @user_character.strength + 1)
      render json: @user_character
    else
      render json: { errors: "Insufficient points" }, status: :bad_request
    end
  end

  def updateXp
    @user_character = UserCharacter.find(params[:id])
    @user_character.update(xp: @user_character.xp + params[:xp])
    render json: @user_character
  end

  def destroy
    @user_character = UserCharacter.find(params[:id])
    @user_character.destroy
    render json: @user_character, status: :not_found
  end

  def acceptQuest
    @user_character = UserCharacter.find(params[:id])
    @user_character.update(quests: @user_character.quests.push(params[:quest]))
    @quest = Quest.find(params[:quest])
    render json: @quest
  end

  def getInventory
    @user_character = UserCharacter.find(params[:id])
    @inventory = Inventory.find(@user_character.inventory)
    render json: @inventory
  end

  def updateCharacter
    @user_character = UserCharacter.find(params[:idChar])
    @quest = Quest.find(params[:idQuest])
    @user_character.update(
      questsDone: @user_character.questsDone.push(params[@quest])
    )
    render json: @user_character
  end

  private

  def character_params
    params.require(:user_character).permit(:name)
  end

  def user_character_params
    params.require(:user_character).permit(
      :user_id,
      :level,
      :lifePoints,
      :points,
      :strength,
      :wisdom,
      :xp,
      character: %i[name image description]
    )
  end
end
