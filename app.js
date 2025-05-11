'use strict';

// Psuedocode:

// Create a Kiseki hangman's mini game where an input will appear when the player clicks the 'play' button, then a input field would popup prompting the user to guess a letter should he get it right then the next letter would be calculated. This proceeds until the user has guessed the entirety of the phrase.

// 1. You know the drill.. Connect HTML and Javascript, start by the container and the result display div.

// 2. Create a phrase function that not only creates them but also generates them by random.

// 3. Implement a function that determines whether the player has guessed correctly, you'll need if statements and to properly ensure that a valid comparison is being made.

// 4. Make a function that display the result in the DOM, by using and updating the result display div.

// 5. Introduce underscores before a letter is being guessed and switch things up if the correct letter has been selected.

// 6. Create a button and ensure that by clicking this button causing the entire game to start. Also add an input element once the button has been clicked.

// 7. Create a condition that if the user fails to guess a letter 5 times he gets a game over message, potentially a dialog element would work best.

// 8. (Optional) add CSS and visually enhance your project and upload to github.

const container = document.querySelector('.game-container');
const resultDisplay = document.getElementById('result');

let currentQuote = InitializeRandomKisekiQuotes();
let hasBegun = false;
let remainingLives = 5;
const LIVES_ICON = `<img src="Images/Lloyd Bannings Icon.png" class="lives-icon">`;
let lives;

function generateBasicFunctionality() {
    const startGameButton = document.createElement('button');
    container.appendChild(startGameButton);
    startGameButton.classList.add('start-button');
    startGameButton.textContent = 'Play Game?';
    resultDisplay.insertAdjacentElement('beforebegin', startGameButton);
    const tutorialDisplay = document.querySelector('.tutorial');
    const message = document.querySelector('.message');
    container.appendChild(tutorialDisplay);
    tutorialDisplay.classList.add('hidden');

    if (message && tutorialDisplay) {
        if (tutorialDisplay.parentNode) {
            tutorialDisplay.parentNode.removeChild(tutorialDisplay);
        }
        message.insertAdjacentElement('afterend', tutorialDisplay);
    }

    startGameButton.addEventListener('click', () => {
        if (hasBegun) return;
        hasBegun = true;
        const input = document.createElement('input');
        tutorialDisplay.classList.remove('hidden');
        container.appendChild(input);
        input.setAttribute('id', 'input-element');
        input.placeholder = `Type here a single character!`;
        input.setAttribute('autocomplete', 'off');
        input.setAttribute('autocorrect', 'off');
        input.setAttribute('spellcheck', 'off');
        resultDisplay.insertAdjacentElement('afterend', input);

        const gameTextDiv = document.createElement('div');
        gameTextDiv.id = 'game-text';
        gameTextDiv.textContent = revealedState.join('');
        resultDisplay.innerHTML = '';
        resultDisplay.appendChild(gameTextDiv);

        startGameButton.style.display = 'none';
        lives = document.createElement('div');
        lives.classList.add('lives-display');
        lives.innerHTML = LIVES_ICON.repeat(remainingLives);
        resultDisplay.insertAdjacentElement('afterbegin', lives);

        input.addEventListener('change', (e) => {
            e.preventDefault();
            isUserCorrect(input.value, currentQuote);
            input.value = '';
        });
    });
}

generateBasicFunctionality();

function InitializeRandomKisekiQuotes() {
    const kisekiQuotes = [
        'If fishing at a hospital is wrong I dont want to be right',
        'Impossible The Empire hasnt yet turned out a man desperate enough to woo that alcoholic typhoon.',
        'Oh dear youre right Im turning twenty five this year death is swiftly approaching...',
        'I want all three of ya to step on me',
        'There is no such thing as a dumb question Regnitz but that one came awfully close',
        'Why is my present a boy',
        'No man is an island no matter how much they may wish to isolate themselves from others no one can live their life truly alone',
        'Stunning ladies in bikinis wrestling piggyback in the pool Come for the fights stay for the accidental exposure',
        `You would actually make me do it too Ah cruelty thy name is Mueller`
    ];
    const randomQuote = kisekiQuotes[Math.floor(Math.random() * kisekiQuotes.length)];
    return randomQuote;
}

const revealedState = Array.from(currentQuote).map(letter => letter === ' ' ? ' ' : '_');

function isUserCorrect(userGuess, quote) {
    const message = document.querySelector('.message');
    const lowerCaseQuote = quote.toLowerCase();
    const lowerCaseUserGuess = userGuess.toLowerCase();
    if (lowerCaseUserGuess.length !== 1) {
        console.log(`You mustn't insert more than 1 character at a time!`);
        return;
    }
    console.log(lowerCaseQuote);
    let found = false;
    Array.from(lowerCaseQuote).forEach((character, index) => {
        if (character === lowerCaseUserGuess) {
            revealedState[index] = quote[index];
            found = true;
        }
    });

    if (found) {
        message.textContent = `You got the letter right! Lloyd is proud!`;
    } else {
        message.textContent = `You it got it wrong, Lloyd must be weeping!`;
        remainingLives--;
        lives.innerHTML = LIVES_ICON.repeat(remainingLives);
    }
    console.log(remainingLives);

    const gameTextDiv = document.getElementById('game-text');
    gameTextDiv.textContent = revealedState.join('');

    if (!revealedState.includes('_')) {
        message.textContent = `You've won the game! Incredible! A true Kiseki connoisseur!`;
        resetGame();
    }

    if (remainingLives === 1) {
        message.textContent = `Lloyd's life is in deep peril!`;
    }

    if (remainingLives <= 0) {
        message.textContent = `It's over our beloved protagonist Lloyd Bannings is dead... `;
        resetGame();
        setTimeout(() => {
            message.textContent = '';
        }, 2500);
    }
    console.log(`Checking if "${userGuess}" exists in the quote: "${quote}"`);
}

function resetGame() {
    const existingResetButton = document.querySelector('.reset-button');
    const existingInput = document.getElementById('input-element');
    const startGameButton = document.querySelector('.start-button');
    const tutorialDisplay = document.querySelector('.tutorial');
    const message = document.querySelector('.message');

    if (existingResetButton) {
        existingResetButton.remove();
    }
    if (startGameButton) {
        startGameButton.style.display = 'none';
    }
    if (lives) {
        lives.remove();
    }

    tutorialDisplay.classList.add('hidden');
    const resetButton = document.createElement('button');
    resetButton.className = 'reset-button';
    resetButton.textContent = 'Restart Game?';
    resultDisplay.insertAdjacentElement('beforebegin', resetButton);
    resultDisplay.style.display = 'block';
    remainingLives = 5;

    if (existingInput) {
        existingInput.style.display = 'none';
    }

    resultDisplay.innerHTML = '';

    resetButton.addEventListener('click', () => {
        resetButton.remove();
        if (existingInput) {
            existingInput.remove();
        }
        startGameButton.style.display = 'none';
        if (lives) {
            lives.remove();
        }
        resultDisplay.innerHTML = '';

        message.textContent = 'Game is resetting in 3 seconds...';
        setTimeout(() => {
            message.textContent = '';
            hasBegun = false;
            currentQuote = InitializeRandomKisekiQuotes();
            revealedState.splice(
                0,
                revealedState.length,
                ...Array.from(currentQuote).map(letter => letter === ' ' ? ' ' : '_')
            );
            startGameButton.click();
            tutorialDisplay.classList.remove('hidden');
            message.classList.remove('hidden');

            console.log('Game has been reset!');
        }, 3000);
    });
}