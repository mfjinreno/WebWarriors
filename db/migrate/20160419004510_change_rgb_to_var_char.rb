class ChangeRgbToVarChar < ActiveRecord::Migration
  def change
    change_column :bugs, :rgb, :string
  end
end
