class CreateBugStats < ActiveRecord::Migration
  def change
    create_table :bug_stats, force: :cascade do |t|
        t.integer "rank",               default: 0
        t.integer "online_wins",        default: 0
        t.integer "online_losses",      default: 0
        t.integer "online_battles",     default: 0
        t.integer "ai_wins",            default: 0
        t.integer "ai_losses",          default: 0
        t.integer "ai_battles",         default: 0
        t.integer "current_streak",     default: 0
        t.integer "longest_streak",     default: 0
    end
  end
end
