class ApplicationController < ActionController::Base
  helper_method :current_user

  # Unless there is a user logged in, they would always be redirected
  # to the root_url if they try to access another RESTful endpoint
  
  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def require_user
    redirect_to 'root_url' unless current_user
  end
end
