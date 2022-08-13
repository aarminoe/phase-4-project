class GroupsController < ApplicationController

    def index 
        group = Group.all
        render json: group
    end

    def create
        group = Group.create(group_params)
        if group.valid?
            render json: group, status: :created 
        else
            render json: { errors: group.full_messages }, status: :unprocessable_entity
        end
    end

    private 

    def group_params 
        params.permit(:name)
    end
    
end
