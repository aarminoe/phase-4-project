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
end
