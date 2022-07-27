Rails.application.routes.draw do
  resources :users do
    resources :groups
    resources :profiles
    resources :friends
    resources :posts do
      resources :comments
      resources :likes
    end
  end






  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
