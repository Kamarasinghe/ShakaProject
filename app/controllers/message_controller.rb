class MessageController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :require_user, except: [:index]

  def index
    @messages = Message.all.order('created_at DESC')
    render json: @messages, :include => [:user]
  end

  def create
    @message = Message.new(message_params)

    if @message.save
      render :json => 'Success'
    else
      render :json => 'Failed'
    end
  end

  def update
    @message = Message.find_by(id: params[:messageId])
    @message.update(message: params[:newMessage])
  end

  def destroy
    @message = Message.find_by(id: params[:messageId])
    @message.destroy
  end

  private 
    def message_params
      params.require(:messages).permit(:message, :user_id)
    end
end
