class CreateBugs < ActiveRecord::Migration
  def change
    create_table :bugs do |t|
      t.string :bug_name
      t.text :head
      t.text :body
      t.text :legs

      t.timestamps null: false
    end
  end
end
