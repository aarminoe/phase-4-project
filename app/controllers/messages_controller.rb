class MessagesController < ApplicationController

    def destroy
        message = Message.find_by(id:params[:id])
        if message
            message.destroy
            head :no_content
        else
            render json: { error: 'Message not found' }, status: :not_found
        end
    end

    def create
        message = Message.create(message_params)
        if message.valid?
            render json: message, status: :created 
        else
            render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private 

    def message_params 
        params.permit(:conversation_id, :who_messaged, :message)
    end 
end
