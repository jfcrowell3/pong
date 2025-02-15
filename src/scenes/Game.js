import { Scene } from 'phaser';

export class Game extends Scene
{
    constructor ()
    {
        super('Game');
    }

    preload ()
    {
        this.load.setPath('assets');
        
        this.load.image('background', 'background.png');
        this.load.image('ball', 'ball.png');
        this.load.image('paddle', 'paddle.png');
    }

    create ()
    {
        const { width, height } = this.sys.game.config

        this.add.tileSprite(0, 0, width, height, 'background').setOrigin(0);

        // Disable collision on the bottom; left, right, and top still collide.
        this.physics.world.setBoundsCollision(true, true, true, false);

        this.paddle = this.physics.add.image(width/2, height*.85, 'paddle').setScale(4,2);
        this.paddle.body.allowGravity = false;
        this.paddle.setImmovable(true);
        this.paddle.setCollideWorldBounds(true);

        this.ballSpeed = 300;
        const randomX = Phaser.Math.Between((width / 10), width - (width/10));
        const randomAngle = Phaser.Math.DegToRad(Phaser.Math.FloatBetween(45,135));
        let xVelocity = this.ballSpeed * Math.cos(randomAngle);
        let yVelocity = this.ballSpeed * Math.sin(randomAngle);

        this.ball = this.physics.add.sprite(randomX,0, 'ball').setScale(2, 2).setBounce(1);
        this.ball.setCollideWorldBounds();
        this.ball.setVelocity(xVelocity, yVelocity);

        this.collider = this.physics.add.collider(this.paddle, this.ball, this.handleBallPaddleCollision, null, this);

        this.cursors = this.input.keyboard.createCursorKeys();

        //Score
        this.score = 0;
        this.scoreText = this.add.text(5,5, "Score: " + this.score, {
            fontSize: "32px",
            fill: "#000"
        });

    }

    update ()
    {
        if (this.cursors.left.isDown) {
            this.paddle.setVelocityX(-300);
        } else if (this.cursors.right.isDown) {
            this.paddle.setVelocityX(300);
        }
        // If no keyboard input, check for pointer (mouse/touch) input
        else if (this.input.activePointer.isDown) {
            this.paddle.x = Phaser.Math.Clamp(
                this.input.activePointer.x,
                this.paddle.displayWidth / 2,
                this.sys.game.config.width - this.paddle.displayWidth / 2
            );
        } else {
            this.paddle.setVelocityX(0);
        }

        if (this.ball.y > this.sys.game.config.height) {
            this.scene.start('GameOver');
        }

    }

    handleBallPaddleCollision() {
        this.ballSpeed += 10;
        const currentVelocity = this.ball.body.velocity;
        const currentAngle = Math.atan2(currentVelocity.y, currentVelocity.x);
        this.ball.setVelocity(this.ballSpeed * Math.cos(currentAngle), this.ballSpeed * Math.sin(currentAngle));
        this.score += 10;
        this.scoreText.setText("Score: " + this.score);
    }
}
