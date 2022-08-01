class UsersController < ApplicationController
    
    def index
        users = User.all 
        render json: users, include: ['profile', 'friends', 'groups', 'posts', 'posts.comments', 'posts.post_likes', 'posts.comments.comment_likes', 'messages']
    end

    def create 
        user = User.create(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
        else
            render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def show
        current_user = User.find(session[:user_id])
        render json: current_user
    end
    
    def update
        user = User.find(session[:user_id])
        if user 
            user.update(bio: params[:bio])
            render json: user, status: :created
        else
            render json: { error: 'User not found' }, status: :not_found
        end
    end


    private

    def user_params
        params.permit(:username, :password, :password_confirmation, :avatar_url, :bio)
    end

end
