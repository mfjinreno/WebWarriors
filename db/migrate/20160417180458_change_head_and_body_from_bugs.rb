class ChangeHeadAndBodyFromBugs < ActiveRecord::Migration
  def change
      change_column :bugs, :head, :integer
      change_column :bugs, :body, :integer
      add_column :bugs, :rgb, :integer
  end
end
