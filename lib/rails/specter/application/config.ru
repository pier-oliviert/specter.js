run Specter::Application.initialize!

Specter::Application.routes.draw do
  resources :tests, only: [:show, :index] do
    member do
      get :run
      get :expected
    end
  end
  root 'tests#index'
end

