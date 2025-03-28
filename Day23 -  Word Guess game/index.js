const inputs = document.querySelector(".word"),
    hintTag = document.querySelector(".hint span"),
    guessLeft = document.querySelector(".guess span"),
    mistakes = document.querySelector(".wrong span"),
    resetBtn = document.querySelector(".reset"),
    hintBtn = document.querySelector(".showhint"),
    hintElement = document.querySelector(".hint"),
    typeInput = document.querySelector(".type-input");

let word, incorrectLetters = [], correctLetters = [], maxGuesses;

function startNewGame() {
    alert("New Game Started! Guess New Word :)");
    hintElement.style.display = "none";
    hintElement.style.opacity = "0";

    const ranWord = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranWord.word;
    maxGuesses = word.length >= 5 ? 8 : 6;
    incorrectLetters = [];
    correctLetters = [];
    hintTag.innerText = ranWord.hint;
    guessLeft.innerText = maxGuesses;
    mistakes.innerText = incorrectLetters.join(", ");

    inputs.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.disabled = true;
        inputs.appendChild(input);
    }

    typeInput.style.opacity = "1";
    typeInput.style.pointerEvents = "auto";
    typeInput.focus();
}

function handleInput(e) {
    const key = e.target.value.toLowerCase();
    if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(key) && !correctLetters.includes(key)) {
        if (word.includes(key)) {
            for (let i = 0; i < word.length; i++) {
                if (word[i] === key) {
                    inputs.querySelectorAll("input")[i].value = key;
                }
            }
            correctLetters.push(key);
        } else {
            maxGuesses--;
            incorrectLetters.push(key);
            mistakes.innerText = incorrectLetters.join(", ");
        }
    }

    guessLeft.innerText = maxGuesses;
    if (correctLetters.length === word.length) {
        alert(`Congrats! You Found The Word ${word.toUpperCase()}`);
        startNewGame();
    } else if (maxGuesses < 1) {
        alert("Game Over! You Don't Have Remaining Guesses!");
        for (let i = 0; i < word.length; i++) {
            inputs.querySelectorAll("input")[i].value = word[i];
        }
    }

    typeInput.value = "";
}

function showHintElement() {
    hintElement.style.display = "block";
    hintElement.style.opacity = "1";
}

resetBtn.addEventListener("click", startNewGame);
hintBtn.addEventListener("click", showHintElement);
typeInput.addEventListener("input", handleInput);
inputs.addEventListener("click", () => typeInput.focus());
document.addEventListener("keydown", () => typeInput.focus());

startNewGame();