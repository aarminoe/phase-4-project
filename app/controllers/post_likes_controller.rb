class PostLikesController < ApplicationController

    def create 
        like = PostLike.create(postlike_params)
        render json: like 
    end

    def destroy 
        like = PostLike.find_by(id:params[:id])
        if like
            like.destroy 
            head :no_content
        else
            render json: { error: 'Like not found' }, status: :not_found
        end
    end

    private 

    def postlike_params
        params.permit(:user_who_liked, :post_id)
    end
end
