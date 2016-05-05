class AddRankToUsers < ActiveRecord::Migration
  def change
    add_column :users, :rank, :integer, default: 0
    add_column :users, :online_wins, :integer, default: 0
    add_column :users, :online_losses, :integer, default: 0
    add_column :users, :online_battles, :integer, default: 0
    add_column :users, :ai_wins, :integer, default: 0
    add_column :users, :ai_losses, :integer, default: 0
    add_column :users, :ai_battles, :integer, default: 0
    add_column :users, :current_streak, :integer, default: 0
    add_column :users, :longest_streak, :integer, default: 0
  end
end
