class GroupMessagesController < ApplicationController

    def create
        group_message = GroupMessage.create(group_message_params)
        if group_message.valid? 
            render json: group_message, status: :created 
        else
            render json: { errors: group_message.errors.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def group_message_params 
        params.permit(:user_id, :group_id, :message, :sender_name, :sender_avatar_url)
    end
end
