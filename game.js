window.onload = function() {
    const config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 500 },
                debug: true,
            }
        },
        
        backgroundColor: "ed1c24",
        scene: [Cena01, Cena02]
    };

    const game = new Phaser.Game(config);
}
