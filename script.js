const canvasStart = () => {

    
    const canvas = document.querySelector('canvas');
    const cxt = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    
    const rand = (minLimit, maxLimit) => Math.ceil(
            (Math.random() * (maxLimit - minLimit + 1)) + minLimit
        );
    
    const randRGB = () => `rgb(${rand(0,255)},${rand(0,255)},${rand(0,255)})`;
    
    class Ball
    {
    
        constructor(X, Y, velX, velY, radius, color) {
    
            this.X = X;
            this.Y = Y;
            this.velX = velX;
            this.velY = velY;
            this.radius = radius;
            this.color = color;
    
        }
    
        draw() {
    
            cxt.beginPath();
    
            cxt.fillStyle = this.color;
            cxt.arc(this.X, this.Y, this.radius, 0, 2*Math.PI);
    
            cxt.fill();
    
        }
    
        update() {
    
            if((this.X + this.radius) >= width){
                this.velX *= -1;
                this.color = randRGB();
            }
            if((this.X - this.radius) <= 0){
                this.velX *= -1;
                this.color = randRGB();
            }
            if((this.Y + this.radius) >= height){
                this.velY *= -1;
                this.color = randRGB();
            }
            if((this.Y - this.radius) <= 0){
                this.velY *= -1;
                this.color = randRGB();
            }
    
            this.X += this.velX;
            this.Y += this.velY;
    
        }
    
        /* collisionDetector() {
    
            balls.forEach(ball => {
    
                if(!(this === ball)) {
    
                    const distX = Math.max(this.X, ball.X) - Math.min(this.X, ball.X);
                    const distY = Math.max(this.Y, ball.Y) - Math.min(this.Y, ball.Y);
    
                    const dist = Math.sqrt(distX*distX + distY*distY);
    
                    if(dist < this.radius + ball.radius){
                        ball.color = this.color = randRGB();
                    }
    
                }
    
            });
    
        } */
    
        ballsCollide(ball) {
    
            this.velX *= -1;
            this.velY *= -1;
            ball.velX *= -1;
            ball.velY *= -1;
            console.log("from ballsCollide");
    
            this.color = ball.color = randRGB();
    
        }
    
    }
    
    const balls = [];
    const numOfBalls = 35;
    
    while(balls.length < numOfBalls) {
    
        let radius = rand(10, 20);
        let ball = new Ball(
                rand(radius, width - radius),
                rand(radius, height - radius),
                rand(-10, 10),
                rand(-10, 10),
                radius,
                randRGB()
            );
            
        balls.push(ball);
    
    }
    
    const loopAnimation = () => {
    
        cxt.fillStyle = 'rgba(5, 5, 26, 0.25)';
        cxt.fillRect(0, 0, width, height);
    
        balls.forEach(ball => {
            ball.draw();
            ball.update();
            /* ball.collisionDetector(); */
        });
    
        requestAnimationFrame(loopAnimation);
    
    }
    
    loopAnimation();

};

document.addEventListener('click', canvasStart());