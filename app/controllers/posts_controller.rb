class PostsController < ApplicationController
    
    def index
        posts = Post.all 
        render json: posts
    end

    def create
        post = Post.create(post_params)
        if post.valid?
            render json: post, status: :created 
        else
            render json: { errors: post.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def update 
        post = Post.find_by(id:params[:id])
        if post 
            post.update(post:params[:post])
            render json: post
        else
            render json: { error: 'Post not found' }, status: :not_found
        end
    end

    def destroy 
        post = Post.find_by(id:params[:id])
        if post 
            post.destroy
            head :no_content
        else
            render json: { error: 'Post not found' }, status: :not_found
        end
    end

    private

    def post_params 
        params.permit(:post, :user_id)
    end
end
