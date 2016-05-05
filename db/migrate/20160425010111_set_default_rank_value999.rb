class SetDefaultRankValue999 < ActiveRecord::Migration
  def change
    change_column_default :bug_stats, :rank, from: 0, to: 9999
  end
end
