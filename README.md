# WebWarriors

## Install
* sudo apt-get install ImageMagick
* bundle install
* rake db:migrate
* rake db:setup
* rails server
* Go to http://localhost:3000

## Contributions
This project was created as an assignment for CSE 3901 at Ohio State. 5 group members contributed in varying degrees. I (Michael Johnston), with the consent of the group, have now taken continuing it as a personal project, as the idea for a Bugs Language game has been a dream of mine for almost a year before the class began. Below are the contributions of members during the time we worked on it as a team. My contributions after the final submission will be listed at the bottom. -MJ

### Nathan Borak
* JS testing, profile page logic, profile pictures
* Fixed funtion in high_score_controller

### Lucas Rodriguez

* Implement all of the JavaScript functions for the Bug game
* Implement the HTML of the Arena page (did not style any of it)
* Implement running the Bug Game on the arena page
* Implement the Bug Images on the server
* Implement a majority of the game controller actions

### Alex Kaps

* Worked on including Ace Editor in bug_creator page that did not make it into final product.
* Created bug_stats table in db, and extensively edited bug_stats, bugs, and users tables.
* Implemented controller for highscores page.
* Modified highscores page to list bugs in ranked order.
*  Modified models to include Foreign keys and dependencies.


### Michael Johnston
* Created and styled Profile page
* Created and styled Leaderboard page
* Created and styled Bug Builder page
* Implemented Devise for user profiles
* Modified generated User model to include various fields
* Edited controller to include user authentication and image fields
* Styled Arena Page
* Styled all devise views
* Created JQuery functions for RGB selection on Bug Builder
* Created and styled navbar and template for pages
* Created images for various bug types
* (After project submission and as personal project)

### Yuze Chen
* Implemented Leaderboard page. Joins bugs and bug_stats tables and show all bugs with their stats.  
* Add method to update the rank after each game. 
* Created db migration 
* Created after game ajax to send scores to backend
* Retrieve data from db in high_score view
* Implemented contest table in home view
* Testing javascript using QUnit

### Michael Johnston (After Project submission)
* Added ELO ranking system to leaderboard for more accurate ranks
* Added turnRight turnLeft to command list
* Added boolean AND/OR logic
* Added boolean NOT function 
* Added is_Right is_Left boolean primitives.
* Fixed bug where parser invalidates if-statement without following else
* Added Stop move.