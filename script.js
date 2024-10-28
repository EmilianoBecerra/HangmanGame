const secretWords = [
 "Costos",
 "Peron",
 "Evita",
 "Doctrina",
 "Verdad",
 "Realidad",

];

const body = ["head", "body", "pants", "footer"];

const secretWord = secretWords[Math.floor(Math.random() * secretWords.length)];
const hiddenWord = "_".repeat(secretWord.length).split("");
const letterInput = document.getElementById("letter");
const wordDisplay = document.getElementById("word-display");
const guessForm = document.getElementById("guess-form");
const btn_reset = document.getElementById("btn-reset");
const btn_ready = document.getElementById("btn_ready");
const messageDisplay = document.getElementById("message");
const letterAttempts = document.getElementById("letterAttempts");
const guessedLetter = [];
let attempts = 0;

wordDisplay.textContent = hiddenWord.join(" ");

function updateDisplay() {
  letterInput.value = "";
  wordDisplay.textContent = hiddenWord.join(" ");
  letterAttempts.textContent = guessedLetter.join("-");
}

function guessLetter() {
  messageDisplay.textContent = "";
  const letter = letterInput.value;
  const lowerSecretWord = secretWord.toLowerCase();
  if (!guessedLetter.includes(letter)) {
    if (lowerSecretWord.includes(letter)) {
      for (let i = 0; i < secretWord.length; i++) {
        if (lowerSecretWord[i] === letter) hiddenWord[i] = letter;
      }
      guessedLetter.push(letter);
    } else {
      guessedLetter.push(letter);
      if (attempts <= 3) {
        const img = document.getElementById(`${body[attempts]}`);
        img.style.display = "inline";
      }
      attempts++;
    }
  } else {
    messageDisplay.style.color = "black"
    messageDisplay.textContent = "Esa letra ya fue elegida.";
  }
  updateDisplay();
}

function winGame() {
  if (!wordDisplay.innerText.includes("_") && attempts <= 4) {
    messageDisplay.textContent = "BIEN PERONISTA!";
    message.classList.add("win");
    const imgRope = document.getElementById("rope");
    const person = document.getElementById("skeleton");
    person.style.display = "none";
    imgRope.style.display = "none";
    btn_ready.style.display = "none";
    btn_reset.style.display = "block";
  } else if (attempts === 5) {
    messageDisplay.textContent = "RADICAAAL";
    message.classList.add("loss");
    message.style.color = "red";
    btn_ready.style.display = "none";
    btn_reset.style.display = "block";
    const img = document.getElementById("skeleton");
    img.classList.add("finish");
  }
}

function reset() {
  wordDisplay.textContent = hiddenWord.join(" ");
}

/* function winGame() {} */

btn_ready.addEventListener("click", (e) => {
  e.preventDefault();
  guessLetter();
  winGame();
});

btn_reset.addEventListener("click", (e) => {});
