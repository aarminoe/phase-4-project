Rails.application.routes.draw do
  
  post "/log", to: "sessions#create"
  get "/me", to: "users#show"
  
  resources :groups do
    resources :users
  end
  
  resources :users do
    resources :messages
    resources :groups
    resources :profiles
    resources :friends
    resources :posts do
      resources :post_likes
      resources :comments do 
        resources :comment_likes
      end
    end
  end




  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
