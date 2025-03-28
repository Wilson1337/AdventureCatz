// Phaser.js Cat Game - Kid-Friendly Explanation
// This is a simple game where a cat moves around and collects coins.

const config = {
    type: Phaser.AUTO, // Let Phaser choose the best way to run the game
    width: 800, // Width of the game screen
    height: 600, // Height of the game screen
    physics: {
        default: 'arcade', // Simple physics for movement
        arcade: {
            gravity: { y: 300 }, // Makes things fall down like in real life
            debug: false
        }
    },
    scene: { preload, create, update } // Tells Phaser what to do
};

const game = new Phaser.Game(config);
let cat;
let cursors;
let coins;
let score = 0;
let scoreText;

function preload() {
    this.load.image('background', 'background.png');
    this.load.image('ground', 'ground.png');
    this.load.image('cat', 'cat.png');
    this.load.image('coin', 'coin.png');
}


function create() {
    // Add background image (make sure it's centered and properly scaled)
    this.add.image(400, 300, 'background').setScale(1);

    // Add the ground
    this.add.image(400, 550, 'ground');

    // Add the cat
    cat = this.physics.add.sprite(100, 450, 'cat').setCollideWorldBounds(true);

    // Create coins
    coins = this.physics.add.group({ key: 'coin', repeat: 10, setXY: { x: 100, y: 0, stepX: 70 } });

    // Make coins bounce a little
    coins.children.iterate(coin => {
        coin.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
    });

    // Add overlap detection
    this.physics.add.overlap(cat, coins, collectCoin, null, this);

    // Allow arrow keys
    cursors = this.input.keyboard.createCursorKeys();

    // Display score
    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#fff' });
}


function update() {
    // Move the cat left or right using arrow keys
    if (cursors.left.isDown) {
        cat.setVelocityX(-160); // Move left
    } else if (cursors.right.isDown) {
        cat.setVelocityX(160); // Move right
    } else {
        cat.setVelocityX(0); // Stop moving
    }
}

function collectCoin(cat, coin) {
    // When the cat touches a coin, it disappears and adds points
    coin.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
