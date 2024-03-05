//variaveis.
var player;
var teclado;
var moeda;
var pontuacao = 0;
var placar;
var fantasma;
var gameOver = false;
var ida = true;
let isJumping = false

class Cena02 extends Phaser.Scene {
    constructor() {
        super('Cena02');
    }

    //carregando as imagens e sprites que serão utilizadas no jogo.
    preload() {
        this.load.image('background', 'assets/background.png');
        this.load.image('plataforma_tijolo', 'assets/tijolos.png');
        this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48});
        this.load.spritesheet('ghost', 'assets/ghost.png', { frameWidth: 428, frameHeight: 487});
        this.load.image('moeda', 'assets/moeda.png');
    }

    //adicionando as imagens e sprites ao jogo.
    create() {
        this.add.image(400, 300, 'background');

        //adicionando o nosso player no jogo e definindo sua fisica.
        player = this.physics.add.sprite(100, 500, 'dude');
        player.setCollideWorldBounds(true);
        player.body.setSize(32, 48, true);
        player.setBounce(0.2);
        this.physics.world.setBounds(0, 0, 800, 600 - 133);

        //informando como a sprite irá se comportar de acordo com cada direção do player.
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        teclado = this.input.keyboard.createCursorKeys();

        //inicialização da lista de plataformas.
        var plataformas = [];

        //adicionando as plataformas à lista.
        plataformas.push(this.physics.add.staticImage(400, 300, 'plataforma_tijolo'));
        plataformas.push(this.physics.add.staticImage(100, 200, 'plataforma_tijolo'));

        //adicionando a colisão entre o player e as plataformas usando um loop for...of.
        for (const plataforma of plataformas) {
            //adiciona um colisor entre o player e a plataforma atual.
            this.physics.add.collider(player, plataforma);
        }

        //adição do placar.
        placar = this.add.text(20, 20, 'Moedas: ' + pontuacao, { fontSize: '45px', fill: '#000000' });

        //adicionando as moedas, juntamente com a fisica.
        moeda = this.physics.add.sprite(600, 0, 'moeda').setScale(0.5);
        moeda.setCollideWorldBounds(true);
        moeda.setBounce(0.5);
        this.physics.add.collider(moeda, plataformas);

        //responsividade do placar após o player coletar uma moeda.
        this.physics.add.overlap(player, moeda, function () {
            moeda.setVisible(false);
            var posicaoMoeda_Y = Phaser.Math.RND.between(50, 400);
            var posicaoMoeda_X = Phaser.Math.RND.between(50, 650);
            moeda.setPosition(posicaoMoeda_Y, posicaoMoeda_X);
            pontuacao += 1;
            placar.setText('Moedas: ' + pontuacao);
            moeda.setVisible(true);
        });

        //adicionando o fantasma no jogo.
        fantasma = this.physics.add.sprite(300, 500, 'ghost').setScale(0.09);
        fantasma.setCollideWorldBounds(true);
        fantasma.body.setSize(50, 50, true);

        //configurando a colisão do fantasma com o player.
        this.physics.add.collider(fantasma, plataformas);
        this.physics.add.collider(player, fantasma, hit, null, this);

        //configurando a animação do fantasma 
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 0 }),
            frameRate: 15,
            repeat: -1
        });

        //ativamos a animação configurada previamente.
        fantasma.anims.play('fly', true);

        // Adicionando uma propriedade personalizada para controlar o movimento vertical
        fantasma.velocidadeY = 1;

    }

    update() {


        //adicionando movimentação ao player.
        if (teclado.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        }
        else if (teclado.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        }
        else {
            player.setVelocityX(0);
            player.anims.play('turn');
        }

        if (player.body.velocity.y > 0) isJumping = false

        //adicionando a lógica para permitir que o jogador pule usando a seta para cima.
        if (teclado.up.isDown) {
            if (!isJumping) {
                player.setVelocityY(-200);
                isJumping = true
            }
        }

        //configurando a movimentação no fantasma no jogo.
        if (fantasma.x === 100) {
            fantasma.setFlip(false, false);
            ida = true;
        }

        if (fantasma.x < 750 && ida === true) {
            fantasma.x += 5;
        }

        if (Math.abs(fantasma.x - 750) < 5) {
            fantasma.setFlip(true, false);
            ida = false;
        }

        if (fantasma.x > 100 && ida === false) {
            fantasma.x -= 5;
        }

        //criando a tela de gameover.
        if (gameOver) {

            setTimeout(() => {

               // scoreSpan.textContent = score;
                scoreDiv.style.display = 'block';

            }, 1500);

            return;
        }
    }

}

//informando que caso o fantasma entre em colisão com o player, o jogo acabe.
function hit(player, fantasma) {
    this.physics.pause();

    player.setTint(0xff0000);
}




