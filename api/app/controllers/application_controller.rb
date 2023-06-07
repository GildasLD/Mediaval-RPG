class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  require "auth_token"
  before_action :configure_permitted_parameters, if: :devise_controller?
  def after_sign_in_path_for(resource)
    "/quests"
  end

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(
      :sign_up,
      keys: %i[username email login password]
    )
    devise_parameter_sanitizer.permit(
      :sign_in,
      keys: %i[username email login password]
    )
  end

  def verify_jwt_token
    if request.headers["Authorization"].nil? ||
         !AuthToken.valid?(request.headers["Authorization"].split(" ").last)
      head :unauthorized
    end
  end
end
