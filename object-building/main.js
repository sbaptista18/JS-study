//this program will feature some balls bouncing around the screen
//they will all behave in the same kind of way, so they will be represented with an object

//setup canvas
var canvas = document.querySelector('canvas');

//object that directly represents the drawing area of the canvas and allows to draw 2D shapes on it.
var ctx = canvas.getContext('2d');

//gets the browser vieport's width and height and applies to the canvas width and height
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

//function to generate random number
//takes two numbers as arguments, and returns a random number in the range between the two
function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

//modeling the ball
//add the constructor
//it includes:
//  x and y coordinates
//  horizontal and vertical velocity
//  color
//  size (it will be its radius, in pixels)
function Ball(x,y,velX,velY,color,size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

//Ball methods
//tell the Ball to draw itself onto the screen, by calling a series of members of the 2D canvas context defined earlier (ctx)
Ball.prototype.draw = function(){
    ctx.beginPath(); //state we want to draw a shape
    ctx.fillStyle = this.color; //define the color of the shape

    //trace the arc shape
    //parameters:
    //  x and y position of the arc center - ball's x and y property
    //  radius of the arc - specifies ball's size property
    //  start and end number of degrees round the circle that the arc is drawn between
    //  fill the area
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}

//Update the ball's data
Ball.prototype.update = function() {
    //check whether the ball has reached the edge of the canvas
    //the ball is going of the right hand edge
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    //the ball is going off the left hand edge
    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    //the ball is going off the bottom edge
    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    //the ball is going off the top edge
    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    //add the velX value to the x coordinate, and the velY value to the y coordinate
    this.x += this.velX;
    this.y += this.velY;
}

//Collision detection
Ball.prototype.collisionDetect = function() {
    //for each ball, it's needed to check every other ball to see if it has collided with the current ball
    for (var j = 0; j < balls.length; j++) {
        //check whether the current ball being looped through is the same ball as the one we are currently checking
        if (!(this === balls[j])) {
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;

            //check the collision of two circles (if the any of the circle's areas overlap)
            var distance = Math.sqrt(dx * dx + dy * dy);

            //if a collision is detected, the color property of both circles is changed to a new random color.
            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) +')';
            }
        }
    }
}

//Animating the ball
//store the balls
var balls = [];

//all programs that animate things generally involve an animation loop
function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)'; //set the canvas fill color. The transparency is to cover up the previous frame's drawing.
    ctx.fillRect(0, 0, width, height); //draws a rectangle across the whole width and height

    while (balls.length < 25) { //the number of balls in the array is < 25
        var size = random(10,20);

        //new instace of Ball()
        var ball = new Ball(
            // ball position always drawn at least one ball width
            // away from the adge of the canvas, to avoid drawing errors
            random(0 + size,width - size),
            random(0 + size,height - size),
            random(-7,7),
            random(-7,7),
            'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
            size
        );
        balls.push(ball); //pushes the value to the end of the ball's array
    }

    for (var i = 0; i < balls.length; i++) { //loops through the balls array
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }

    //it will run the function a set number of times per second to create a smooth animation
    requestAnimationFrame(loop);
}

loop();