class AddBugIdToBugStats < ActiveRecord::Migration
  def change
    add_column :bug_stats, :bug_id, :integer
  end
end
