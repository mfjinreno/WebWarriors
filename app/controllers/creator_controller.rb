# Author: Lucas Rodriguez
# Date Created: 4/12/16
#   Added the new function of the game controller
#     implemented everything but the creating the bug stats
# Modified by: Alex Kaps
# Date: 4/16/16
# Added email: current_user.email
# Modified by: Michael Johnston
# Date: 4/18/16
# => Added user auth
class CreatorController < ApplicationController
  before_action :authenticate_user!
  def  index
    @bugImages = BugImage.all
  end

  # Author: Lucas Rodriguez
  # Implemented the back end to create a new bug from a
  # form passed in from the bug creator page
  # creator/new
  def new

    # Gets all of the parameters passed in from the form
    bugsName = params[:bugsName]
    headId = params[:headId]
    bodyId = params[:bodyId]
    rgbColor = params[:rgbColor]
    bugCode = params[:bugCode]

    new_bug = Bug.create(bug_name: bugsName,
               head: headId,
               body: bodyId,
               rgb: rgbColor,
               code: bugCode,
               email: current_user.email)
    # Redirects to the game page
    redirect_to controller: "game", action: 'index'
  end
end

