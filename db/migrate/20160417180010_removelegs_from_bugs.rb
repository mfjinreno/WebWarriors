class RemovelegsFromBugs < ActiveRecord::Migration
  def change
      remove_column :bugs, :legs, :text
  end
end
