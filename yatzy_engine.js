// Generated score functions using AI for simplicity

function countDice(diceValues) {
    return diceValues.reduce(function(acc, value) {
        acc[value] = (acc[value] || 0) + 1;
        return acc;
    }, {});
}

function scoreOfAKind(diceValues, kind) {
    let counts = countDice(diceValues);
    for (let num in counts) {
        if (counts[num] >= kind) {
            return diceValues.reduce(function(acc, cur) {
                return acc + cur;
            }, 0);
        }
    }
    return 0;
}

function scoreFullHouse(diceValues) {
    let counts = countDice(diceValues);
    let hasThree = false;
    let hasTwo = false;
    for (let num in counts) {
        if (counts[num] === 3) hasThree = true;
        if (counts[num] === 2) hasTwo = true;
    }
    return hasThree && hasTwo ? 25 : 0;
}

function scoreSmallStraight(diceValues) {
    let uniqueValues = Array.from(new Set(diceValues)).sort();
    let straights = [
        [1, 2, 3, 4],
        [2, 3, 4, 5],
        [3, 4, 5, 6]
    ];
    return straights.some(straight => straight.every(num => uniqueValues.includes(num))) ? 30 : 0;
}

function scoreLargeStraight(diceValues) {
    let uniqueValues = Array.from(new Set(diceValues)).sort().join('');
    return uniqueValues === '12345' || uniqueValues === '23456' ? 40 : 0;
}

function scoreChance(diceValues) {
    return diceValues.reduce(function(acc, cur) {
        return acc + cur;
    }, 0);
}

function scoreYatzy(diceValues) {
    return new Set(diceValues).size === 1 ? 50 : 0;
}

function scoreUpperSection(diceValues, number) {
    return diceValues.filter(value => value === number).length * number;
}

function updateScoresAfterRoll() {
    const diceValues = gameState.diceValues;

    if (!gameState.roundStarted || gameState.rollCount === 0) {
        return;
    }

    ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'].forEach((category, index) => {
        updateSingleScore(category, scoreUpperSection(diceValues, index + 1));
    });

    // Updating specialized scores
    updateSingleScore('three-kind', scoreOfAKind(diceValues, 3));
    updateSingleScore('four-kind', scoreOfAKind(diceValues, 4));
    updateSingleScore('full-house', scoreFullHouse(diceValues));
    updateSingleScore('small-straight', scoreSmallStraight(diceValues));
    updateSingleScore('large-straight', scoreLargeStraight(diceValues));
    updateSingleScore('chance', scoreChance(diceValues));
    updateSingleScore('yatzy', scoreYatzy(diceValues));
}


function updateSingleScore(category, score) {
    const elementId = `${category}-value`;
    const scoreElement = document.getElementById(elementId);

    if (!scoreElement.classList.contains('score-confirmed')) {
        scoreElement.textContent = score > 0 ? score : '0'; // Show '0' if score condition is not met
        scoreElement.classList.add('score-possible');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.grid div[id$="-value"]').forEach(function(element) {
        element.addEventListener('click', function() {
            if (!gameState.roundStarted || this.classList.contains('score-confirmed')) {
                return; // Do not interact if the game hasn't started or score is confirmed
            }

            const scoreValue = parseInt(this.textContent, 10);
            // Allow confirming a score of 0
            if ((this.classList.contains('score-possible') && this.classList.contains('clickable')) || (scoreValue === 0 && this.classList.contains('clickable'))) {
                this.classList.add('score-confirmed');
                this.style.fontWeight = 'bold'; // Make it bold
                this.classList.remove('score-possible');

                // Mark the score as selected within gameState
                const scoreType = this.id.replace('-value', '');
                gameState.selectedScores[scoreType] = scoreValue;

                nextRound(); 
            }
        });
    });
});

// Function to clear all possible scores
function clearAllPossibleScores() {
    const scoreElements = document.querySelectorAll('.grid div[id$="-value"]');
    Array.from(scoreElements).forEach(function(element) {
        // Skip elements that have been confirmed
        if (!element.classList.contains('score-confirmed')) {
            element.textContent = '0'; // Reset to '0' only if not confirmed
            element.classList.remove('score-possible');
        }
    });
}

function updateNonClickableScores() {
    // Calculate the sum of the upper section scores
    const upperSectionCategories = ['ones', 'twos', 'threes', 'fours', 'fives', 'sixes'];
    let upperSectionSum = 0;
    upperSectionCategories.forEach(category => {
        upperSectionSum += gameState.selectedScores[category] || 0;
    });
    document.getElementById('sum-value').textContent = upperSectionSum;

    // Calculate and update the bonus
    const bonus = upperSectionSum >= 63 ? 50 : 0;
    document.getElementById('bonus-value').textContent = bonus;

    // Update the total top score
    const totalTop = upperSectionSum + bonus;
    document.getElementById('total-top-value').textContent = totalTop;

    // Calculate the total bottom score from the lower section categories
    const lowerSectionCategories = ['three-kind', 'four-kind', 'full-house', 'small-straight', 'large-straight', 'chance', 'yatzy'];
    let totalBottom = 0;
    lowerSectionCategories.forEach(category => {
        totalBottom += gameState.selectedScores[category] || 0;
    });
    document.getElementById('total-bottom-value').textContent = totalBottom;

    // Calculate and update the final total score
    const finalTotal = totalTop + totalBottom;
    document.getElementById('final-total-value').textContent = finalTotal;
    if(gameEnd()) {
        console.log("Game over. Your final score is: ", finalTotal, " points");
        
        // Set the game over message
        document.getElementById("gameOverMessage").textContent = "Game over. Your final score is: " + finalTotal + " points";
        
        // Display the modal
        let modal = document.getElementById("gameOverModal");
        modal.style.display = "block";
        
        // Get the <span> element that closes the modal
        let closeButton = document.querySelector(".close-button");
        
        // When the user clicks on <span> (x), close the modal
        closeButton.onclick = function() {
            modal.style.display = "none";
        };
        
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    
        // Get the "Start Over" button and add a click event listener
        startOver("finalStartOverButton");   
    }
}


function nextRound() {
    gameState.rollCount = 0;
    gameState.diceValues = [1, 1, 1, 1, 1]; // Reset dice for the new round
    gameState.keep = [false, false, false, false, false]; // Reset keep states
    gameState.roundStarted = false; // Indicate that a new round has started, waiting for the first roll
    gameState.currentRound += 1; // Add the current round 
    document.getElementById('roll-dice').disabled = false; // Re-enable the roll button
    clearAllPossibleScores(); // Adjusted to not clear confirmed scores
    updateNonClickableScores(); // Calculate and display non-clickable scores based on confirmed scores
    updateGameDisplay(); // Reflect the changes in the UI
}

