document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.style.position = 'relative';

    // Dimensions du plateau de jeu
    const gameBoardWidth = 600; // Ajuster selon la taille de votre #gameBoard
    const gameBoardHeight = 400; // Ajuster selon la taille de votre #gameBoard
    gameBoard.style.width = `${gameBoardWidth}px`;
    gameBoard.style.height = `${gameBoardHeight}px`;

    // Créer et ajouter Pac-Man au jeu
    let pacman = document.createElement('div');
    pacman.textContent = '😀'; // Utiliser un emoji pour un effet visuel simple
    pacman.className = 'pacman';
    gameBoard.appendChild(pacman);

    // Position initiale de Pac-Man
    let pacmanX = 50;
    let pacmanY = 50;
    pacman.style.position = 'absolute';
    updatePacmanPosition();

    // Fonction pour mettre à jour la position de Pac-Man
    function updatePacmanPosition() {
        pacman.style.left = `${pacmanX}px`;
        pacman.style.top = `${pacmanY}px`;
    }

    // Ajouter un fruit
    let fruit = document.createElement('div');
    fruit.textContent = '🍎'; // Utiliser un emoji pour le fruit
    fruit.className = 'fruit';
    gameBoard.appendChild(fruit);
    fruit.style.position = 'absolute';
    fruit.style.left = '200px'; // Position initiale du fruit
    fruit.style.top = '200px';

    // Fonction pour déplacer Pac-Man
    function movePacman(x, y) {
        pacmanX += x;
        pacmanY += y;
        pacmanX = Math.max(0, Math.min(gameBoardWidth - pacman.offsetWidth, pacmanX));
        pacmanY = Math.max(0, Math.min(gameBoardHeight - pacman.offsetHeight, pacmanY));
        updatePacmanPosition();
        checkCollision();
    }

    // Vérifier la collision entre Pac-Man et le fruit
    function checkCollision() {
        const pacmanRect = pacman.getBoundingClientRect();
        const fruitRect = fruit.getBoundingClientRect();

        if (!(pacmanRect.right < fruitRect.left ||
              pacmanRect.left > fruitRect.right ||
              pacmanRect.bottom < fruitRect.top ||
              pacmanRect.top > fruitRect.bottom)) {
            fruit.remove(); // Supprimer le fruit en cas de collision
            // Ajouter un nouveau fruit ou augmenter le score ici
        }
    }

    // Écouter les touches du clavier pour le déplacement de Pac-Man
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp': movePacman(0, -20); break;
            case 'ArrowDown': movePacman(0, 20); break;
            case 'ArrowLeft': movePacman(-20, 0); break;
            case 'ArrowRight': movePacman(20, 0); break;
        }
        // Fonction pour créer et ajouter un fruit à une position aléatoire
    


    });
});
