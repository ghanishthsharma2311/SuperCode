// Globale Variablen für das Spiel
// Farben, die im Spiel verwendet werden können
// Der geheime Code, der erraten werden muss
// Aktuelle Rundenzahl
// Timer-Variablen für die Zeitmessung
// Status, ob das Spiel gestartet wurde
// Highscore aus dem LocalStorage laden und anzeigen
const COLORS = ["red", "blue", "green", "yellow", "brown"];
let secretCode = generateSecretCode();
let round = 1;

let startTime = null;
let timerInterval = null;
let gameStarted = false;


// Highscore-Management in LocalStorage
let highscore = localStorage.getItem("supercodeHighscore") || null;
updateHighscoreDisplay();

// Logic for updating and displaying the highscore
function updateHighscoreDisplay() {
  const highscoreDiv = document.getElementById("highscore");
  if (highscore) {
    const minutes = String(Math.floor(highscore / 60)).padStart(2, "0");
    const seconds = String(highscore % 60).padStart(2, "0");
    highscoreDiv.innerText = `Highscore: ${minutes}:${seconds}`;
  } else {
    highscoreDiv.innerText = `Highscore: --:--`;
  }
}

// generating a random secret code  of 4 colors
function generateSecretCode() {
  let code = [];
  for (let i = 0; i < 4; i++) {
    code.push(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }
  console.log("Secret code:", code); // Debug
  return code;
}

// Timer-Functionality
function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateTimerDisplay, 1000);
}

function updateTimerDisplay() {
  const now = Date.now();
  const elapsed = Math.floor((now - startTime) / 1000);
  const minutes = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const seconds = String(elapsed % 60).padStart(2, "0");
  document.getElementById("timer").innerText = `${minutes}:${seconds}`;
}

function stopTimer() {
  clearInterval(timerInterval);
}

// Start-Button Event Listener
document.getElementById("start-button").addEventListener("click", () => {
  if (gameStarted) return;
  gameStarted = true;

  startTimer();
  document
    .querySelectorAll(".color-display")
    .forEach((el) => (el.style.pointerEvents = "auto"));
  document.getElementById("submit-guess").disabled = false;
  document.getElementById("start-button").disabled = true;
});

// disables the color selection and submit button until the game starts
document
  .querySelectorAll(".color-display")
  .forEach((el) => (el.style.pointerEvents = "none"));
document.getElementById("submit-guess").disabled = true;

// color options in the dropdowns
document.querySelectorAll(".color-list").forEach((list) => {
  COLORS.forEach((color) => {
    const option = document.createElement("div");
    option.classList.add("color-option");
    option.dataset.color = color;
    option.style.backgroundColor = color;
    list.appendChild(option);
  });
});

// color selection functionality
document.querySelectorAll(".color-select").forEach((select, index) => {
  const display = select.querySelector(".color-display");
  const list = select.querySelector(".color-list");

  display.addEventListener("click", () => {
    if (!gameStarted) return;
    list.classList.toggle("show");
  });

  list.addEventListener("click", (e) => {
    const selectedColor = e.target.dataset.color;
    if (selectedColor) {
      display.style.backgroundColor = selectedColor;
      list.classList.remove("show");
    }
  });
});

// submit guess functionality

document.getElementById("submit-guess").addEventListener("click", () => {
  if (!gameStarted) return;

  //check if the user has selected 4 colors
  const guess = getCurrentGuess();
  if (guess.includes(null)) {
    alert("Bitte waehle 4 Farben aus.");
    return;
  }

  const result = evaluateGuess(guess, secretCode);
  displayGuess(guess, result);
  round++;

  if (result.black === 4) {
    stopTimer();
    const now = Date.now();
    const elapsedSeconds = Math.floor((now - startTime) / 1000);
    document.getElementById(
      "result"
    ).innerText = `Du hast den Code geknackt in ${
      document.getElementById("timer").innerText
    } Minuten!`;
    document.getElementById("submit-guess").disabled = true;

    // Highscore check
    if (!highscore || elapsedSeconds < highscore) {
      highscore = elapsedSeconds;
      localStorage.setItem("supercodeHighscore", highscore);
      updateHighscoreDisplay();
    }
  } else if (round > 10) {
    stopTimer();
    document.getElementById(
      "result"
    ).innerText = `Leider verloren. Der Code war: ${secretCode.join(
      ", "
    )}. Zeit: ${document.getElementById("timer").innerText}`;
    document.getElementById("submit-guess").disabled = true;
  }
});

// reading the current guess from the color displays what the user submitted
function getCurrentGuess() {
  return Array.from(document.querySelectorAll(".color-display")).map(
    (display) => {
      const color = display.style.backgroundColor;
      return COLORS.includes(color) ? color : null;
    }
  );
}

// Evaluate the user's guess against the secret code
function evaluateGuess(guess, code) {
  let black = 0;
  let white = 0;

  const codeCopy = [...code];
  const guessCopy = [...guess];

  // black hits (correct color and position)
  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] === codeCopy[i]) {
      black++;
      codeCopy[i] = null; 
      guessCopy[i] = null;
    }
  }

  // white hits (correct color, wrong position)
  for (let i = 0; i < 4; i++) {
    if (guessCopy[i] !== null) {
      const index = codeCopy.findIndex((c) => c === guessCopy[i]);
      if (index !== -1) {
        white++;
        codeCopy[index] = null; 
      }
    }
  }

  return { black, white };
}

// Display the user's guess and the feedback
function displayGuess(guess, result) {
  const guessesDiv = document.getElementById("guesses");
  const row = document.createElement("div");
  row.classList.add("guess-row");

  const index = document.createElement("div");
  index.classList.add("index-number");
  index.innerText = round;
  row.appendChild(index);

  guess.forEach((color) => {
    const circle = document.createElement("div");
    circle.classList.add("guess-item");
    circle.dataset.color = color;
    circle.style.backgroundColor = color;
    row.appendChild(circle);
  });

  const resultContainer = document.createElement("div");
  resultContainer.classList.add("guess-result");

  for (let i = 0; i < result.black; i++) {
    const dot = document.createElement("div");
    dot.classList.add("guess-result-item");
    dot.dataset.color = "black";
    dot.style.backgroundColor = "black";
    resultContainer.appendChild(dot);
  }

  for (let i = 0; i < result.white; i++) {
    const dot = document.createElement("div");
    dot.classList.add("guess-result-item");
    dot.dataset.color = "white"; 
    dot.style.backgroundColor = "white"; 
    resultContainer.appendChild(dot);
    console.log("White dot added" + i);
  }

  row.appendChild(resultContainer);
  guessesDiv.appendChild(row);
}
