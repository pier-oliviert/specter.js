Specter::Engine.routes.draw do

  resources :tests, only: [:index]
  get '/specter/tests/*group/:id/run', to: 'tests#run'
  get '/specter/tests/*group/:id', to: 'tests#show'

  root to: 'tests#index'
end

