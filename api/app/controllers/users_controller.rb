class UsersController < ApplicationController
  # before_action :authenticate_user!
  def index
    @users = User.includes(:inventory).all
    render json:
             @users.eager_load(:inventory, :characters).as_json(
               include: [
                 inventory: {
                   only: %i[money helmet shield weapon items]
                 },
                 characters: {
                   only: %i[id name image description]
                 }
               ]
             )
  end

  def show
    @user = User.eager_load(:inventory, :characters).find(params[:id])
    render json:
             @user.as_json(
               include: [
                 inventory: {
                   only: %i[money helmet shield weapon items]
                 },
                 characters: {
                   only: %i[id name image description]
                 }
               ]
             )
  end

  def current
    render json: current_user
  end

  def update
    @user = User.find(params[:id])

    if @user.update(user_params)
      render json: @user
    else
      render json: {
               status: "error",
               message: @user.errors.full_messages
             },
             status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :quests)
  end
end
