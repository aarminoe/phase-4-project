class ConversationsController < ApplicationController

    def create
        conversation = Conversation.create(conversation_params)
        if conversation.valid?
            render json: conversation, status: :created 
        else
            render json: { errors: conversation.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private 

    def conversation_params 
        params.permit(:user_id, :conversation_with)
    end 

end
