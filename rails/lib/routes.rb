Specter::Engine.routes.draw do
  resources :tests, only: [:index, :show] do
    member do
      get :run
    end
  end

  root to: 'tests#index'
end

