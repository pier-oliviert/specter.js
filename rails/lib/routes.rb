Specter::Engine.routes.draw do

  resources :tests, only: [:index]
  get '/tests/*group/:id/run', to: 'tests#run'
  get '/tests/*group/:id', to: 'tests#show'

  root to: 'tests#index'
end

