class UsersController < ApplicationController
  protect_from_forgery with: :null_session

  def index
    @user = User.all
    render :json => @user
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      render :json => 'Success'
    else 
      render :json => 'Failed'
    end
  end

  private 
    def user_params
      params.require(:user).permit(:first, :username, :email, :password, :isAdmin)
    end
end
