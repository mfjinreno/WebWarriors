class CreateBugImages < ActiveRecord::Migration
  def change
    create_table :bug_images do |t|
      t.string :body_part
      t.string :image

      t.timestamps null: false
    end
  end
end
