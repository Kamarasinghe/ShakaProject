class ApplicationController < ActionController::Base
  helper_method :current_user
  
  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def is_admin
    @current_user ||= User.find(session[:is_admin]) if session[:is_admin]
  end

  def require_user
    redirect_to 'root_url' unless is_admin || current_user
  end
end
