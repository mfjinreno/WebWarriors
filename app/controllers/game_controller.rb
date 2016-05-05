# Author: Lucas Rodriguez
# Date Created: 4/12/16
#   Implemented the index, bug, images routes
# Modified by Michael Johnston
# => Added user auth

class GameController < ApplicationController
  before_action :authenticate_user!

  # Author: Lucas Rodriguez
  # Date Created: 4/17/16
  # Gets all of the user bugs and all the other bugs
  # These then get rendered in the index page
  # game/index
  def index
    @index = Bug.all
    @userBugs = Bug.count > 0 ? Bug.where(email: current_user.email) : nil
    @allBugs = Bug.count > 0 ? Bug.all : nil
    @selectedUserBugId = params[:userBugId]
    @selectedOpponentBugId = params[:opponentBugId]

    @bugs = Bug.all


  end

  # Author: Lucas Rodriguez
  # Date Created: 4/16/16
  # Gets the bug by the bugId passed in as an argument
  # And returns a JSON string of the bug
  def bug
    bug = Bug.where(id: params[:bugId])
    render :json => bug.to_json
  end

  # Author: Lucas Rodriguez
  # Date Created: 4/16/16
  # Gets all of the bug images
  def images
    bugImages = BugImage.all
    render :json => bugImages.to_json
  end

  # Author: Yuze Chen
  # Date Created: 4/24/16
  # sort bugs by its wins/(wins+losses), updates to db.
  # Edited by Michael Johnston 4/24/16
  # Gave streak logic
  # Edited error placing 1-0 bugs above 20-1 bugs, made more equitable based on ELO rating
 
  def sorted_bug_stats
    @bug_stats = BugStat.all
    stat_hash = {}

    convergence_constant = 5
    total_wins = 0
    total_losses = 0
    @bug_stats.each do |stat|
      total_wins = total_wins +stat.wins
      total_losses = total_losses + stat.losses
    end
    winning_percent = total_wins.to_f/(total_wins.to_f+total_losses.to_f)

    @bug_stats.each do |stat|
      if (stat.wins+stat.losses)!=0
        stat_hash[stat.bug_id] = (stat.wins+convergence_constant*winning_percent).to_f/(stat.wins.to_f+stat.losses.to_f+convergence_constant)
      else
        stat_hash[stat.bug_id] = 0.to_f
      end
    end

    sorted_bug = stat_hash.sort_by {|key, value| value}.reverse

    currentRank=1;
    for item in sorted_bug
      puts 'key'+ item[0].to_s+', value='+item[1].to_s
      bug=BugStat.find_by(bug_id: item[0])
      bug.update(rank: currentRank)
      currentRank+=1
    end

  end

  def postwin
    @winnerBug = BugStat.find_by(bug_id: params[:winnerId])
    @loserBug = BugStat.find_by(bug_id: params[:loserId])
    @winnerBug.wins+=1
    @loserBug.losses+=1
    @winnerBug.current_streak+=1
    @loserBug.current_streak = 0
    if (@winnerBug.current_streak>@winnerBug.longest_streak)
     @winnerBug.longest_streak = @winnerBug.current_streak
    end

    @winnerBug.save
    @loserBug.save

    sorted_bug_stats

    render :text => 'success'
  end
end
