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
    // Load images for the game
    this.load.image('cat', 'cat.png');
    this.load.image('coin', 'coin.png');
    this.load.image('ground', 'ground.png');
}

function create() {
    // Add background ground image
    this.add.image(400, 300, 'ground');
    
    // Add the cat character, make sure it stays inside the screen
    cat = this.physics.add.sprite(100, 450, 'cat').setCollideWorldBounds(true);
    
    // Create coins for the cat to collect
    coins = this.physics.add.group({ key: 'coin', repeat: 10, setXY: { x: 100, y: 0, stepX: 70 } });
    
    // Make the coins bounce a little
    coins.children.iterate(coin => {
        coin.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
    });
    
    // Check when the cat touches a coin
    this.physics.add.overlap(cat, coins, collectCoin, null, this);
    
    // Allow arrow keys to control the cat
    cursors = this.input.keyboard.createCursorKeys();
    
    // Display the score
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
