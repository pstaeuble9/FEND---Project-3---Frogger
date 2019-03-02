
/*-----------------------------Enemy items------------------------------------------*/

// Enemies our player must avoid
let Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    // Reset the enemy with a new speed after it goes off screen
    this.offScreenX = 505;
    this.startingX = -100;
    if (this.x >= this.offScreenX) {
        this.x = this.startingX;
        this.randomSpeed();
    }
    this.checkCollision();
};

// Speed Multiplier, we increase this value to increase difficulty
// Credit https://github.com/ncaron/frontend-nanodegree-arcade-game/blob/master/js/app.js
let speedMultiplier = 15;

// Random speed generator
Enemy.prototype.randomSpeed = function (){
    // Speed is a random number from 1-10 times speedMultiplier
    this.speed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
};

// Draw the enemy on the screen, required method for game
// Draw the scoreboard on the screen, credit
// https://discussions.udacity.com/t/having-trouble-displaying-the-score/26963
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    ctx.fillStyle = "white";
    ctx.font = "16px Comic Sans MS";
    ctx.fillText("Score: " + player.playerScore, 40, 70);
    ctx.fillText("Lives: " + player.playerLives, 141, 70);
    ctx.fillText("Difficulty: " + speedMultiplier, 260, 70);
};

// Check for collision. Borrowed from
// https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
Enemy.prototype.checkCollision = function() {
    // Set hit boxes for collision detection
    let playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    let enemyBox = {x: this.x, y: this.y, width: 60, height: 70};

    // Check for collisions
    if (playerBox.x < enemyBox.x + enemyBox.width &&
        playerBox.x + playerBox.width > enemyBox.x &&
        playerBox.y < enemyBox.y + enemyBox.height &&
        playerBox.height + playerBox.y > enemyBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Collision detected function, subtract 1 life from playerLives and reset the player to the beginning
Enemy.prototype.collisionDetected = function() {
    "use strict";
    player.playerLives -= 1;
    player.characterReset();
};


/*--------------------------------Gem objects-----------------------------------------*/

// Gems the player should try to pick up - extra points!!
let Gem = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Gem_Orange.png';
    this.gemWaitTime = undefined;
};

// Update gem, call checkCollision
Gem.prototype.update = function() {
    this.checkCollision();
};

// Add gem to the screen
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Check for collision
Gem.prototype.checkCollision = function() {
    // Set hit boxes for collision detection
    var playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    var gemBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions, if playerBox intersects gemBox, we have one
    if (playerBox.x < gemBox.x + gemBox.width &&
        playerBox.x + playerBox.width > gemBox.x &&
        playerBox.y < gemBox.y + gemBox.height &&
        playerBox.height + playerBox.y > gemBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Gem collision detected, hide the gem,
// Player score goes up, wait 5 seconds, then reset the gem
Gem.prototype.collisionDetected = function() {
    this.x = 900;
    this.y = 900;
    player.playerScore += 30;
    this.wait();
};

// Call setTimeout in a function so we can assign it to a variable
// Necessary for clearTimeout(gem.gemWaitTime) to work
Gem.prototype.wait = function() {
    this.gemWaitTime = setTimeout( function() {
        gem.gemReset();
    }, 5000);
};

// Set the gem on a new location
Gem.prototype.gemReset = function() {
    // Gems appear at one of the following x positions: 0, 101, 202, 303, 404
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    // Gems appear at one of the following Y positions: 60, 145, 230
    this.y = (60 + (85 * Math.floor(Math.random() * 3) + 0));
};

/*--------------------------------Heart Object---------------------------------------*/

// Heart object itself
let Heart = function(x,y) {
    this.x = x;
    this.y = y;
    this.sprite = 'images/Heart.png';
    this.heartWaitTime = undefined;
};

// Update heart, call checkCollision
Heart.prototype.update = function() {
    this.checkCollision();
};

// Add a heart to the screen
Heart.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Check for collision
Heart.prototype.checkCollision = function() {
    "use strict";
    // Set hitboxes for collision detection
    let playerBox = {x: player.x, y: player.y, width: 50, height: 40};
    let heartBox = {x: this.x, y: this.y, width: 60, height: 70};
    // Check for collisions, if playerBox intersects heartBox, we have one
    if (playerBox.x < heartBox.x + heartBox.width &&
        playerBox.x + playerBox.width > heartBox.x &&
        playerBox.y < heartBox.y + heartBox.height &&
        playerBox.height + playerBox.y > heartBox.y) {
        // Collision detected, call collisionDetected function
        this.collisionDetected();
    }
};

// Heart collision detected, hide the heart,
// Add 1 to playerLives, wait 30 seconds, then reset the heart
Heart.prototype.collisionDetected = function() {
    this.x = 900;
    this.y = 900;
    player.playerLives += 1;
    this.wait();
};

// Call setTimeout in a function so we can assign it to a variable
// Necessary for clearTimeout(heart.heartWaitTime) to work
Heart.prototype.wait = function() {
    this.heartWaitTime = setTimeout( function() {
        heart.heartReset();
    }, 30000);
};

// Move heart to a different location
Heart.prototype.heartReset = function() {
    "use strict";
    //Hearts appear at one of the following x positions: 0, 101, 202, 303, 404
    this.x = (101 * Math.floor(Math.random() * 4) + 0);
    //Hearts appear at one of the following Y positions: 70, 155, 240
    this.y = (70 + (85 * Math.floor(Math.random() * 3) + 0));
};


/*------------------------------Player Object----------------------------------------*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
// Start the player at 200x by 400y
// credit https://discussions.udacity.com/t/need-help-refactoring/32466
let Player = function()
{
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
    this.sprite = 'images/char-horn-girl.png';
    this.playerScore = 0;   // score starts at 0
    this.playerLives = 3;   //start with 3 lives
};

// Required method for game
// Check if playerLives is 0. If playerLives === 0 reset game
Player.prototype.update = function()
{
    if (this.playerLives === 0) {
    // clearTimeout(heart.heartWaitTime);
    reset();
    }
};

// Resets the player position to the start position
Player.prototype.characterReset = function()
{
    this.startingX = 200;
    this.startingY = 400;
    this.x = this.startingX;
    this.y = this.startingY;
};

// Increase score and speed of bugs
Player.prototype.success = function()
{
    this.playerScore += 20;
    speedMultiplier += 5;
    this.characterReset();
};

// Draw the player on the screen, required method for game
Player.prototype.render = function()
{
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Move the player according to which arrow key is pressed
Player.prototype.handleInput = function(allowedKeys)
{
    switch (allowedKeys) {
        case "left":

            if (this.x > 0) {
                this.x -= 101;
            }
            break;
        case "right":

            if (this.x < 402) {
                this.x += 101;
            }
            break;
        case "up":

            if (this.y < 0) {
                this.success(); // if player gets to water success
            } else {
                this.y -= 83;
            }
            break;
        case "down":
            if (this.y < 400) {
                this.y += 83;
            }
            break;
    }
};


/*-------------------------Instantiate Objects--------------------------------*/

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player


// Instantiate allEnemies array
var allEnemies = [];

// Instantiate player
var player = new Player();



// Instantiate all enemies, set to 3 starting enemies
for (var i = 0; i < 3; i++) {
    //startSpeed is a random number from 1-10 times speedMultiplier
    var startSpeed = speedMultiplier * Math.floor(Math.random() * 10 + 1);
    //enemys start off canvas (x = -100) at the following Y positions: 60, 145, 230
    allEnemies.push(new Enemy(-100, 60 + (85 * i), startSpeed));
}

// Instantiate Gem
// Gems appear at one of the following x positions: 0, 101, 202, 303, 404
// And at one of the following Y positions: 60, 145, 230
var gem = new Gem (101 * Math.floor(Math.random() * 4) + 0, 60 +
    (85 * Math.floor(Math.random() * 3) + 0));

// Instantiate heart
// Hearts appear at one of the following x positions: 0, 101, 202, 303, 404
// And at one of the following Y positions: 70, 155, 240
var heart = new Heart (101 * Math.floor(Math.random() * 4) + 0, 70 +
    (85 * Math.floor(Math.random() * 3) + 0));


/*---------------------------Event Listeners-----------------------------------*/

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

/* Re-written as a named function so we can use removeEventListener
 * during "startGame" and "gameOver." Before, the event listener was active
 * during those states, so pressing arrow keys changed the starting position
 * of the player when we switched to "inGame"
 * credit http://stackoverflow.com/questions/4950115/removeeventlistener-on-anonymous-functions-in-javascript
 */
var input = function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
};
document.addEventListener('keyup', input);

