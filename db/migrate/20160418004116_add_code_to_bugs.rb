class AddCodeToBugs < ActiveRecord::Migration
  def change
    add_column :bugs, :code, :string
  end
end
