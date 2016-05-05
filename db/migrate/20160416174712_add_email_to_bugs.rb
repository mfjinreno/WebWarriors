class AddEmailToBugs < ActiveRecord::Migration
  def change
      add_column :bugs, :email, :string
  end
end
