class CharactersController < ApplicationController
  def index
    @characters = Character.all
    render json: @characters
  end

  def create
    @character = Character.create(name: params[:name], image: params[:image])
    @inventory = Inventory.create(items: [])
    @character.update(inventory: @inventory.id)
    if @character.save
      render json: @character, status: :created
    else
      render json: {
               errors: @character.errors.full_messages
             },
             status: :bad_request
    end
  end

  def charactersUser
    @characters = Character.where(user: params[:id])
    render json: @characters
  end

  def pickCharacter
    @character = Character.find(params[:id])
    render json: @character
  end

  def updateLifePoints
    @character = Character.find(params[:id])
    if @character.points > 0
      @character.update(points: @character.points - 1)
      @character.update(lifePoints: @character.lifePoints + 1)
      render json: @character
    else
      render json: { errors: "Insufficient points" }, status: :bad_request
    end
  end

  def updateStrength
    @character = Character.find(params[:id])
    if @character.points > 0
      @character.update(points: @character.points - 1)
      @character.update(strength: @character.strength + 1)
      render json: @character
    else
      render json: { errors: "Insufficient points" }, status: :bad_request
    end
  end

  def updateXp
    @character = Character.find(params[:id])
    @character.update(xp: @character.xp + params[:xp])
    render json: @character
  end

  def destroy
    @character = Character.find(params[:id])
    @character.destroy
    render json: @character, status: :not_found
  end

  def acceptQuest
    @character = Character.find(params[:id])
    @character.update(quests: @character.quests.push(params[:quest]))
    @quest = Quest.find(params[:quest])
    render json: @quest
  end

  def getInventory
    @character = Character.find(params[:id])
    @inventory = Inventory.find(@character.inventory)
    render json: @inventory
  end

  def updateCharacter
    @character = Character.find(params[:idChar])
    @quest = Quest.find(params[:idQuest])
    @character.update(questsDone: @character.questsDone.push(params[@quest]))
    render json: @character
  end

  private

  def character_params
    params.require(:character).permit(:name)
  end
end
