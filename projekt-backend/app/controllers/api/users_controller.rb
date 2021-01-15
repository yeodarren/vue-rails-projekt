module Api
  class UsersController < ApplicationController
    before_action :authorized, only: [:auto_login, :update]
    
    # REGISTER
    def create
      @user = User.create(user_params)
      if @user.valid?
        token = encode_token({user_id: @user.id})
        render json: {user: @user, token: token}
      else
        render json: {error: "Invalid email or password"}
      end
    end
  
    # LOGGING IN
    def login
      @user = User.find_by(email: params[:email])
  
      if @user && @user.authenticate(params[:password])
        token = encode_token({user_id: @user.id})
        render json: {user: @user, teams: @user.teams, projects: @user.projects, token: token}
      else
        render json: {error: "Invalid email or password"}, status: :unauthorized
      end
    end
  
  
    def auto_login
      render json: {user: @user, teams: @user.teams, projects: @user.projects}
    end

    def index
      @users = User.all
      render json: @users
    end

    def update
      if @user.update(user_params)
        render json: {user: @user, teams: @user.teams, projects: @user.projects }
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    end

    private
  
    def user_params
      params.permit(:name, :email, :password)
    end
  end
end  