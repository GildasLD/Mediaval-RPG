class RiddlesController < ApplicationController
  def new
    @riddle = Riddle.new
  end

  def index
    if params[:quest_id] && params[:stage_id]
      @riddles =
        Riddle.where(quest_id: params[:quest_id], stage_id: params[:stage_id])
    else
      @riddles = Riddle.all
    end

    render json: @riddles
  end

  def create
    json_data = JSON.parse(reriddle.body.read)
    riddle =
      Riddle.new(
        description: json_data["description"],
        riddleion: json_data["riddleion"],
        firstSuggestion: json_data["firstSuggestion"],
        secondSuggestion: json_data["secondSuggestion"],
        thirdSuggestion: json_data["thirdSuggestion"],
        fourthSuggestion: json_data["fourthSuggestion"],
        answer: json_data["answer"]
      )
    if riddle.save
      render json: { status: "success" }, status: :ok
    else
      render json: {
               status: "error",
               message: riddle.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end
  def show
    @riddle = Riddle.find(params[:id])
    render json: @riddle
  end
  def update
    @riddle = Riddle.find(params[:id])
    if @riddle.update(riddle_params)
      render json: @riddle
    else
      render json: @riddle.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @riddle = Riddle.find(params[:id])
    if @riddle.destroy
      render json: @riddle, status: :ok
    else
      render json: @riddle.errors, status: :unprocessable_entity
    end
  end

  private

  def riddle_params
    params.require(:riddle).permit(
      :riddleion,
      :firstSuggestion,
      :secondSuggestion,
      :thirdSuggestion,
      :fourthSuggestion,
      :answer
    )
  end
end
