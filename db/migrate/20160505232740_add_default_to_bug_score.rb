class AddDefaultToBugScore < ActiveRecord::Migration
  def up
    change_column_default :bug_stats, :elo_score, 1200
  end
end
