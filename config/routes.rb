Rails.application.routes.draw do
  delete '/logout' => 'sessions#destroy'
  post '/login' => 'sessions#create'
  post '/message' => 'message#create'
  get '/messages' => 'message#index'
  get '/users' => 'users#index'
  post '/signup' => 'users#create'
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
