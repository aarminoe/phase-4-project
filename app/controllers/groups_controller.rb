class GroupsController < ApplicationController
    skip_before_action :authorized, only: :index
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

    def order 
        groups = Group.order(:name).pluck(:name)
        render json: groups 
    end

    private 

    def group_params 
        params.permit(:name)
    end
    
end
