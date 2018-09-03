class SessionsController < ApplicationController
  protect_from_forgery with: :null_session

  def new
  end

  def create
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render :json => @user
    else
      render :json => 'failed'
    end
  end

  def destroy
    session[:user_id] = nil
    render :json => 'logged out'
  end
end
