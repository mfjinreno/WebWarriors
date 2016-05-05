class AddForeignKeyToBugStats < ActiveRecord::Migration
  def change
      add_foreign_key :bug_stats, :bugs
  end
end
