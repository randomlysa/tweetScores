# TweetScores

Update scores using a web UI. Game info is availble in JSON format and can be imported into programs like
vMix to update the scoreboard.

Optionally, authorize with twitter and tweet your scores.

See current working version at http://code.randomlysa.com/tweetScores/

### Getting Started

A very generalized getting started...
* Create database using `database.mysql`.
* Clone/download project.
* Search/replace `http://code.randomlysa.com/tweetScores` with the URL where you plan to host your project.
* Run `webpack` to create `bundle.js`.
* Rename `config.php.example` to `config.php`.
* Register a twitter app and update `config.php` with the key, secret, and callback, as well as db info.
* Upload to a server with php. Current structure is `index.html and bundle.js` in root, then style and php folders.


### Notes
Team name is not written to the database until a score is updated.


### Todo
Clientid is not updated in the database if game starts, then user authorizes with twitter.