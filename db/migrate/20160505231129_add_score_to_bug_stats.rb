class AddScoreToBugStats < ActiveRecord::Migration
  def change
  	add_column :bug_stats, :elo_score, :integer
  end
end
