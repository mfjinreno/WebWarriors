# Created by: Alex Kaps
# Date: 4/13/16
class BugStat < ActiveRecord::Base
    belongs_to :bug, :foreign_key => "bug_id", :class_name => "Bug"
end
