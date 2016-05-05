class AddForeignKeyToBugs < ActiveRecord::Migration
  def change
      add_foreign_key :bugs, :users, column: :email, primary_key: "email"
  end
end
