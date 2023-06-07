class StagesController < ApplicationController
  def new
    @quest = Stage.new
  end
  def index
    @quests = Stage.all
    render json: @quests
  end

  def create
    json_data = JSON.parse(request.body.read)
    quest = Stage.new(description: json_data["description"])
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
    @quest = Stage.find(params[:id])
    render json: @quest
  end
  def update
    @quest = Stage.find(params[:id])

    if @quest.update(quest_params)
      render json: @quest
    else
      render json: @quest.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @quest = Stage.find(params[:id])
    if @quest.destroy
      render json: @quest, status: :ok
    else
      render json: @quest.errors, status: :unprocessable_entity
    end
  end

  private

  def quest_params
    params.require(:quest).permit(:description)
  end
end
