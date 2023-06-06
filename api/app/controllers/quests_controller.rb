class QuestsController < ApplicationController
  def new
    @quest = Quest.new
  end
  def index
    @quests = Quest.all
    render json: @quests
  end

  def create
    json_data = JSON.parse(request.body.read)
    quest =
      Quest.new(
        name: json_data["name"],
        description: json_data["description"],
        user_id: 1
      )
    if quest.save
      render json: { status: "success" }, status: :ok
    else
      render json: {
               status: "error",
               message: quest.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end
  def show
    @quest = Quest.find(params[:id])
    render json: @quest
  end
  def update
    @quest = Quest.find(params[:id])

    if @quest.update(quest_params)
      render json: @quest
    else
      render json: @quest.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @quest = Quest.find(params[:id])
    if @quest.destroy
      render json: @quest, status: :ok
    else
      render json: @quest.errors, status: :unprocessable_entity
    end
  end

  private

  def quest_params
    params.require(:quest).permit(:name, :description)
  end
end
