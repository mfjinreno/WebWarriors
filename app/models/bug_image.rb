class BugImage < ActiveRecord::Base
  belongs_to :bug, :foreign_key => "id", :class_name => Bug
end
