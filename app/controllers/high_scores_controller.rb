# Modified by: Alex Kaps
# Date: 4/17/16
# added _sorted_bug_stats and _sorted_bugs functions
class HighScoresController < ApplicationController

    def index
        @bugs = Bug.all
        @bug_stats = BugStat.all
        #@sorted_bugs = _sorted_bugs
    end

    # Modified by Nathan Borak -  fixed bugs
    def sorted_bug_stats
        stat_hash = {}
        for stat in @bug_stats
          if (stat.wins+stat.losses)>=20
            stat_hash[stat.bug_id] = stat.elo_score
          end
        end

        stat_hash.values.sort
        stat_hash.each do |key, value|
          puts('key='+key+', value='+value)
        end
    end 
end
