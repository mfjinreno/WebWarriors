Rails.application.routes.draw do
 get 'users/index'

  devise_for :users, :path => ''

  root 'home#index'
  get 'home/index' => 'home#index'

  get 'game/index' => 'game#index'
  get 'game/bug' => 'game#bug'
  get 'game/images' => 'game#images'
  post 'game/postwin' => 'game#postwin'
  get 'game/postwin' => 'game#postwin'

  get 'highscores/index' => 'high_scores#index'

  get 'profile/index' => 'profile#index'

  get 'creator/index' => 'creator#index'
  post 'creator/new' => 'creator#new'
  get 'creator/images' => 'creator#images'

end
