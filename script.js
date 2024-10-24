const secretWords = [
  "Elefante",
  /*  "Enchufe",
  "Antonio",
  "Astuto",
  "Orfanato",
  "Ortiva",
  "Inspector",
  "Instituto",
  "Universo",
  "Unico", */
];

const boyd = ["head", "body", "pants", "footer"];

const secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];

const hiddenWord = "_".repeat(secretWord.length).split("");
const letterInput = document.getElementById("letter");
const wordDisplay = document.getElementById("word-display");
const guessForm = document.getElementById("guess-form");
const btn_ready = document.getElementById("btn_ready");
const messageDisplay = document.getElementById("message");
const letterAttempts = document.getElementById("letterAttempts");
const guessedLetter = [];
let attempts = 0;

wordDisplay.textContent = hiddenWord.join(" ");

function updateDisplay() {
  wordDisplay.textContent = hiddenWord.join(" ");
  letterAttempts.textContent = guessedLetter.join("-");
}

function guessLetter() {
  winGame();
  const letter = letterInput.value.toLowerCase();
  if (!guessedLetter.includes(letter)) {
    guessedLetter.push(letter);
    updateDisplay();
    if (
      secretWord.includes(letter) ||
      secretWord.includes(letter.toUpperCase())
    ) {
      for (let i = 0; i < secretWord.length; i++) {
        if (secretWord[i].toLocaleLowerCase() == letter) {
          hiddenWord[i] = letter;
          updateDisplay();
        }
      }
    } else {
      attempts++;
      const img = document.getElementById(`${boyd[attempts - 1]}`);
      img.style.display = "inline";
    }
  } else {
    messageDisplay.textContent = "Esa letra ya fue elegida";
  }
  letterInput.value = "";
}

function winGame() {
  if (!hiddenWord.includes("_") && attempts != 5) {
    messageDisplay.textContent = "Felicitaciones, GANASTE!!";
  } else if (attempts == 4) {
    messageDisplay.textContent = "No te quedan mas intentos";
    letterInput.value = "";
    const img = document.getElementById(`skeleton`);
    img.classList.add("finish");
    btn_ready.disabled = true;
  }
}

btn_ready.addEventListener("click", (e) => {
  e.preventDefault();
  guessLetter();
});
