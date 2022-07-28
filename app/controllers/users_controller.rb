class UsersController < ApplicationController
    
    def index
        users = User.all 
        render json: users, include: ['profile', 'friends', 'groups', 'posts', 'posts.comments', 'posts.post_likes', 'posts.comments.comment_likes']
    end

    def create 
        user = User.create(user_params)
        if user.valid?
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end


    private

    def user_params
        params.permit(:name, :password, :password_confirmation)
    end
end
