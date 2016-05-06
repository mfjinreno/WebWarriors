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
    # returns a hash of arrays sorted with the top score in the first place
=begin
     def _sorted_bugs
        @sorted_bugs=Hash.new
        sorted_bug_stats = _sorted_bug_stats
        sorted_bug_stats.each do |key,value|
            bug = @bugs.where(id: key).first
            bug_stat = @bug_stats.where(bug_id: key).first
            if !bug.blank?
                @sorted_bugs[bug.bug_name] = [bug.bug_name,bug.email,bug_stat.wins,
                                              bug_stat.losses,bug_stat.current_streak,bug_stat.longest_streak]
            end
        end
        @sorted_bugs
    end
=end

        
end
