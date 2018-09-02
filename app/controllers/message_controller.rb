class MessageController < ApplicationController
  def index
    # @messages = Message.joins(:user)
    # render :json => @messages
    @messages = Message.all
    @users = User.all
    render :json => [ @messages, @users ]
  end
end
