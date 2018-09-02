class MessageController < ApplicationController
  def index
    @messages = Message.all
    render json: @messages, :include => [:user]
  end
end
