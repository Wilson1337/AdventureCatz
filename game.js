const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: { preload, create, update }
};

let cat;
let cursors;
let coins;
let score = 0;
let scoreText;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', 'background.png');
    this.load.image('ground', 'ground.png');
    this.load.image('cat', 'cat.png');
    this.load.image('coin', 'coin.png');
}

function create() {
    // Background image
    this.add.image(400, 300, 'background').setDepth(-1); // Ensure it stays behind everything

    // Ground image (for aesthetics only, not solid)
    this.add.image(400, 550, 'ground');

    // Create cat sprite
    cat = this.physics.add.sprite(100, 450, 'cat');
    cat.setCollideWorldBounds(true);
    cat.setBounce(0.1);

    // Create coins
    coins = this.physics.add.group({
        key: 'coin',
        repeat: 10,
        setXY: { x: 100, y: 0, stepX: 70 }
    });

    coins.children.iterate((coin) => {
        coin.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
    });

    // Score text
    scoreText = this.add.text(16, 16, 'Score: 0', {
        fontSize: '32px',
        fill: '#ffffff'
    });

    // Enable overlap detection between cat and coins
    this.physics.add.overlap(cat, coins, collectCoin, null, this);

    // Enable arrow keys
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (cursors.left.isDown) {
        cat.setVelocityX(-160);
    } else if (cursors.right.isDown) {
        cat.setVelocityX(160);
    } else {
        cat.setVelocityX(0);
    }

    if (cursors.up.isDown && cat.body.touching.down) {
        cat.setVelocityY(-330); // Jump
    }
}

function collectCoin(cat, coin) {
    coin.disableBody(true, true);
    score += 10;
    scoreText.setText('Score: ' + score);
}
