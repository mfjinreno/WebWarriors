class RemoveAiFromBugstats < ActiveRecord::Migration
  def change
    remove_column :bug_stats, :ai_losses, :integer
    remove_column :bug_stats, :ai_wins, :integer
    rename_column :bug_stats, :online_losses, :losses
    rename_column :bug_stats, :online_wins, :wins
  end
end
