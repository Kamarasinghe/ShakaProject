Rails.application.routes.draw do
  post '/login' => 'sessions#create'
  get '/users' => 'users#index'
  get '/messages' => 'message#index'
  post '/signup' => 'users#create'
  root to: 'pages#home'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
