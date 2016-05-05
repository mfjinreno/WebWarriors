class RemoveColumnsFromBugStats < ActiveRecord::Migration
  def change
    remove_column :bug_stats, :ai_battles, :integer
    remove_column :bug_stats, :online_battles, :integer
  end
end
