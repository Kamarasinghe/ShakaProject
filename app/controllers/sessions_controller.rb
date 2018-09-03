class SessionsController < ApplicationController
  protect_from_forgery with: :null_session

  def new
  end

  def create
    puts 'This is params', params[:username]
    @user = User.find_by(username: params[:username])
    if @user && @user.authenticate(params[:password])
      session[:user_id] = @user.id
      render :json => @user.username
    else
      render :json => 'failed'
    end
  end
end
