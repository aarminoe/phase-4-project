class FriendsController < ApplicationController


    def create 
        friend = Friend.create(friend_params)
        if friend.valid?
            render json: friend, status: :created
        else
            render json: { errors: friend.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy
        friend = Friend.find_by(id:params[:id])
        if friend 
            friend.destroy
            head :no_content
        else
            render json: { error: 'Friend not found' }, status: :not_found
        end
    end

    private

    def friend_params
        params.permit(:username, :user_id, :bio, :avatar_url)
    end

end
