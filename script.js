document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    gameBoard.style.position = 'relative';

    
    const gameBoardWidth = 600; 
    const gameBoardHeight = 400;
    gameBoard.style.width = `${gameBoardWidth}px`;
    gameBoard.style.height = `${gameBoardHeight}px`;

    
    let pacman = document.createElement('div');
    pacman.textContent = '😀'; // Utiliser un emoji pour un effet visuel simple
    pacman.className = 'pacman';
    gameBoard.appendChild(pacman);

    
    let pacmanX = 50;
    let pacmanY = 50;
    pacman.style.position = 'absolute';
    updatePacmanPosition();

   
    function updatePacmanPosition() {
        pacman.style.left = `${pacmanX}px`;
        pacman.style.top = `${pacmanY}px`;
    }

    
    let fruit = document.createElement('div');
    fruit.textContent = '🍎'; 
    fruit.className = 'fruit';
    gameBoard.appendChild(fruit);
    fruit.style.position = 'absolute';
    fruit.style.left = '200px';
    fruit.style.top = '200px';

   
    function movePacman(x, y) {
        pacmanX += x;
        pacmanY += y;
        pacmanX = Math.max(0, Math.min(gameBoardWidth - pacman.offsetWidth, pacmanX));
        pacmanY = Math.max(0, Math.min(gameBoardHeight - pacman.offsetHeight, pacmanY));
        updatePacmanPosition();
        checkCollision();
    }

    /
    function checkCollision() {
        const pacmanRect = pacman.getBoundingClientRect();
        const fruitRect = fruit.getBoundingClientRect();

        if (!(pacmanRect.right < fruitRect.left ||
              pacmanRect.left > fruitRect.right ||
              pacmanRect.bottom < fruitRect.top ||
              pacmanRect.top > fruitRect.bottom)) {
            fruit.remove(); // Supprimer le fruit en cas de collision
            i
        }
    }

    
    document.addEventListener('keydown', (e) => {
        switch(e.key) {
            case 'ArrowUp': movePacman(0, -20); break;
            case 'ArrowDown': movePacman(0, 20); break;
            case 'ArrowLeft': movePacman(-20, 0); break;
            case 'ArrowRight': movePacman(20, 0); break;
        }
       
    


    });
});
