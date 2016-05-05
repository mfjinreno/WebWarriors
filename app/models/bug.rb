# Modified by: Alex Kaps
# Date: 4/17/16
# added create_bug_stat function
class Bug < ActiveRecord::Base
    belongs_to :user, :foreign_key => "email", :class_name => "User"
    has_one :bug_stat, dependent: :destroy
    has_one :bug_image, :foreign_key => "id", :class_name => "BugImage"
    
    after_create :create_bug_stat
    def create_bug_stat
        BugStat.create(:bug_id => id)
    end
end
