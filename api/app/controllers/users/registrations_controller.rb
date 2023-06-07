class Users::RegistrationsController < Devise::RegistrationsController
  # Be sure to enable JSON.
  respond_to :html, :json
end
