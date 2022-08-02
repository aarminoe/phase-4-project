class UsergroupsController < ApplicationController

    def create 
        usergroup = Usergroup.create(usergroup_params)
        if usergroup.valid? 
            render json: usergroup 
        else
            render json: { errors: usergroup.full_messages }, status: :unprocessable_entity
        end
    end

    private

    def usergroup_params
        params.permit(:user_id, :group_id)
    end
end
