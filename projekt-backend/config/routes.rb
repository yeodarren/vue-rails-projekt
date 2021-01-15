Rails.application.routes.draw do
  
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  namespace :api do
    resources :teams
    resources :projects
    post "/register", to: "users#create"
    post "/login", to: "users#login"
    get "/auto_login", to: "users#auto_login"
    get "/users", to: "users#index"
    put "/user/:id", to: "users#update"
  end
end
