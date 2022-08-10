Rails.application.routes.draw do
  
  post "/log", to: "sessions#create"
  delete '/logout', to: 'sessions#destroy'
  get "/me", to: "users#show"
  get '/posts', to: 'posts#index'

  resources :groups do
    resources :users
  end
  
  resources :usergroups
  resources :group_messages
  resources :users do
    resources :conversations do
      resources :messages
    end
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
