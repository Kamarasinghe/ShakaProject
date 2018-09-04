class SessionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def new
  end

  def create
    @user = User.find_by(username: params[:session][:username])
    if @user && @user.authenticate(params[:session][:password])
      session[:user_id] = @user.id
      session[:is_admin] = @user.isAdmin
      render :json => @user
    else
      render :json => 'failed'
    end
  end

  def destroy
    session[:user_id] = nil
    session[:is_admin] = nil
    render :json => 'logged out'
  end
end
