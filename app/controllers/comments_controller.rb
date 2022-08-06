class CommentsController < ApplicationController
    
    def create
        comment = Comment.create(comment_params)
        if comment.valid?
            render json: comment, status: :created 
        else
            render json: { errors: comment.errors.full_messages }, status: :unprocessable_entity
        end
    end

    def destroy 
        comment = Comment.find_by(id:params[:id])
        if comment 
            comment.destroy 
            head :no_content
        else
            render json: { error: 'Comment not found' }, status: :not_found
        end
    end

    private

    def comment_params
        params.permit(:post_id, :comment, :who_commented)
    end
end
