class InventoriesController < ApplicationController
  before_action :set_inventory, only: %i[show update destroy]

  # GET /inventories
  def index
    @inventories = Inventory.all
    render json: @inventories
  end

  # GET /inventories/:id
  def show
    render json: @inventory
  end

  # POST /inventories
  def create
    @inventory = Inventory.new(inventory_params)

    if @inventory.save
      render json: @inventory, status: :created, location: @inventory
    else
      render json: @inventory.errors, status: :unprocessable_entity
    end
  end

  def decrement_money
    @inventory = Inventory.find(params[:id])
    @inventory.money -= params[:money]
    @inventory.save
  end

  # PATCH/PUT /inventories/:id
  def update
    if sufficient_money_and_items?
      update_params.each { |key, value| @inventory.increment(key, value) }
      if @inventory.save
        render json: @inventory, status: :ok
      else
        render json: @inventory.errors, status: :unprocessable_entity
      end
    else
      render json: {
               error: "Insufficient money or items !"
             },
             status: :bad_request
    end
  end

  # DELETE /inventories/:id
  def destroy
    @inventory.destroy
    head :no_content
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_inventory
    @inventory = Inventory.find(params[:id])
  end
  def update_params
    params.require(:inventory).permit(:money, :helmet, :shield, :weapon, :items)
  end
  def sufficient_money_and_items?
    update_params.to_h.all? do |key, value|
      value.negative? ? @inventory[key].to_i + value >= 0 : true
    end
  end
  def inventory_params
    params.require(:inventory).permit(
      :money,
      :helmet,
      :shield,
      :weapon,
      items: []
    )
  end
end
