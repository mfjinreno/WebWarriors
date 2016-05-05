class RemoveColumnsFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :rank, :integer
    remove_column :users, :online_wins, :integer
    remove_column :users, :online_losses, :integer
    remove_column :users, :online_battles, :integer
    remove_column :users, :ai_wins, :integer
    remove_column :users, :ai_losses, :integer
    remove_column :users, :ai_battles, :integer
    remove_column :users, :current_streak, :integer
    remove_column :users, :longest_streak, :integer
  end
end
