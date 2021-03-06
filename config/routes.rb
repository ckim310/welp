Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  namespace :api, defaults: { format: 'json' } do
    resources :users, only: [:show, :create]
    resource :session, only: [:create, :destroy]
    resources :businesses, only: [:create, :index, :show] do
      resources :reviews, only: [:create, :update] do
        resources :reactions, only: [:create, :destroy, :index]
      end
      get "search", on: :collection
      resources :bookmarks, only: [:create, :destroy]
    end
    resources :reviews, only: [:destroy]
  end
end
