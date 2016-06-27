Specter::Engine.routes.draw do

  resources :tests, only: [:index]
  get '/specter/tests/*id/run', to: 'tests#run', as: :run_test
  get '/specter/tests/*id', to: 'tests#show', as: :test

  root to: 'tests#index'
end

