class PostLikesController < ApplicationController

    def create 
        like = PostLike.create(postlike_params)
        render json: like 
    end

    private 

    def postlike_params
        params.permit(:user_who_liked, :post_id)
    end
end
