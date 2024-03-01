let dice = [];
let rollCount = 0;

function rollDice() {
    if (rollCount < 3) {
        for (let i = 0; i < 5; i++) {
            if (!dice[i] || !dice[i].selected) {
                const value = Math.floor(Math.random() * 6) + 1;
                dice[i] = {value, selected: false};
            }
        }
        displayDice();
        rollCount++;
    }
}

function displayDice() {
    const container = document.getElementById('dice-container');
    container.innerHTML = '';
    dice.forEach((die, index) => {
        const dieElement = document.createElement('div');
        dieElement.classList.add('die');
        if (die.selected) {
            dieElement.classList.add('selected');
        }
        dieElement.textContent = die.value;
        dieElement.onclick = function() { toggleDieSelection(index); };
        container.appendChild(dieElement);
    });
}

function toggleDieSelection(index) {
    dice[index].selected = !dice[index].selected;
    displayDice();
}

document.getElementById('roll-dice').addEventListener('click', rollDice);

rollDice(); // Lancez les dés au chargement de la page
