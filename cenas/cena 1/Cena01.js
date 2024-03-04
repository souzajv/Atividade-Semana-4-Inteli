class Cena01 extends Phaser.Scene {
    constructor() {
        super('Cena01');
    }

    create() {
        // Serve para exibir o overlay de entrada
        document.getElementById('inputOverlay').style.display = 'block';

        // Configura o evento de clique no botão
        document.getElementById('startButton').addEventListener('click', () => {
            this.scene.start('Cena02');
            // Oculta o overlay após iniciar
            document.getElementById('inputOverlay').style.display = 'none';
        });
    }
}