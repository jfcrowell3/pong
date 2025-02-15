import { Scene } from 'phaser';

export class GameOver extends Scene
{
    constructor ()
    {
        super('GameOver');
    }

    preload ()
    {}

    create ()
    {
        this.physics.pause();
        const { width, height } = this.sys.game.config;
        const redOverlay = this.add.graphics();
        redOverlay.fillStyle(0xff0000, 0.5);  // red with 50% opacity
        redOverlay.fillRect(0, 0, width, height); // fill screen

        redOverlay.alpha = 0;
        this.tweens.add({
            targets: redOverlay,
            alpha: 1,
            duration: 500,
            ease: 'Linear'
        });

        this.add.text(width/2, (height/2) - 100, "GAME OVER", {
            fill: '#fff',
            fontSize: '64px',
        }).setOrigin(0.5);

        this.playAgainButton = this.add.text(width / 2, height / 2 + 50, 'Play Again', {
            fontSize: '32px',
            fill: '#fff',
            backgroundColor: '#000',
            padding: { x: 10, y: 5 }
        }).setOrigin(0.5)
            .setInteractive();

        this.playAgainButton.on('pointerover', () => {
            this.playAgainButton.setStyle({ fill: '#000' });
            this.playAgainButton.setStyle({ backgroundColor: '#fff' });
        });
        this.playAgainButton.on('pointerout', () => {
            this.playAgainButton.setStyle({ fill: '#fff' });
            this.playAgainButton.setStyle({ backgroundColor: '#000' });
        });
        this.playAgainButton.on('pointerdown', () => {
            this.scene.start('Game'
            )
        })
    }

    update ()
    {}
}
