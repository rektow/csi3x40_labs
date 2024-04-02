/* Reference: https://dcode.domenade.com/tutorials/how-to-create-a-dice-roll-game-with-html-css-and-javascript */

const dotPositionMatrix = {
    1: [[45, 50]],
    2: [[20, 20], [80, 80]],
    3: [[20, 20], [50, 50], [80, 80]],
    4: [[20, 20], [20, 80], [80, 20], [80, 80]],
    5: [[20, 20], [20, 80], [50, 50], [80, 20], [80, 80]],
    6: [[20, 20], [20, 80], [50, 20], [50, 80], [80, 20], [80, 80]]
};

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

function drawDice(diceContainer, diceValues) {
    diceContainer.innerHTML = ''; // Clear previous dice

    diceValues.forEach((value, index) => {
        const dice = document.createElement('div');
        dice.classList.add("dice");

        for (const dotPosition of dotPositionMatrix[value]) {
            const dot = document.createElement("div");
            dot.classList.add("dice-dot");
            dot.style.setProperty("--top", dotPosition[0] + "%");
            dot.style.setProperty("--left", dotPosition[1] + "%");
            dice.appendChild(dot);
        }

        diceContainer.appendChild(dice);
    });
}