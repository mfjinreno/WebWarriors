# Project 6
## Ruby on Rails Project

## Install
* sudo apt-get install ImageMagick
* rake db:migrate
* rake db:setup
* bundle install
* rails server
* Go to http://localhost:3000

## Roles
* Overall Project Manager: Lucas Rodriguez
* Coding Manager: Michael Johnston
* Testing Manager: Alex Kaps
* Documentation: Nathan Borak

## Contributions
Please list who did what for each part of the project.
Also list if people worked together (pair programmed) on a particular section.

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

### Yuze Chen
* Implemented Leaderboard page. Joins bugs and bug_stats tables and show all bugs with their stats.  
* Add method to update the rank after each game. 
* Created db migration 
* Created after game ajax to send scores to backend
* Retrieve data from db in high_score view
* Implemented contest table in home view
* Testing javascript using QUnit

