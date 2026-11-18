let numSquares = 6;
let colors = [];
let pickedColor;
let streak = 0;
let hintVisible = false;
let gameOver = false;

const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const header = document.getElementById("header");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");
const streakDisplay = document.getElementById("streakDisplay");
const hintBtn = document.getElementById("hintBtn");
const hintContainer = document.getElementById("hintContainer");

init();

function init() {
  setupModeButtons();
  setupSquares();
  setupHintToggle();
  resetButton.addEventListener("click", reset);
  reset();
}

function setupModeButtons() {
  modeButtons.forEach((btn) => {
    btn.addEventListener("click", function () {
      modeButtons.forEach((b) => b.classList.remove("selected"));
      this.classList.add("selected");
      numSquares = this.textContent === "Easy" ? 3 : 6;
      reset();
    });
  });
}

function setupHintToggle() {
  hintBtn.addEventListener("click", () => {
    hintVisible = !hintVisible;
    hintBtn.classList.toggle("active", hintVisible);
    hintContainer.classList.toggle("hidden", !hintVisible);
  });
}

function setupSquares() {
  squares.forEach((square) => {
    square.addEventListener("click", function () {
      if (gameOver) return;

      const clickedColor = this.style.backgroundColor;

      if (clickedColor === pickedColor) {
        gameOver = true;
        messageDisplay.textContent = "¡Correcto! 🎉";
        messageDisplay.style.color = "#16a34a";
        resetButton.textContent = "¿Jugar de nuevo?";
        changeColors(clickedColor);
        header.style.background = clickedColor;
        streak++;
        streakDisplay.textContent = streak;
      } else {
        this.classList.add("wrong");
        messageDisplay.textContent = "Intenta de nuevo";
        messageDisplay.style.color = "#dc2626";
        streak = 0;
        streakDisplay.textContent = streak;
      }
    });
  });
}

function reset() {
  gameOver = false;
  colors = generateRandomColors(numSquares);
  pickedColor = pickColor();
  colorDisplay.textContent = pickedColor.toUpperCase();
  updateHintBars();
  resetButton.textContent = "Nuevos Colores";
  messageDisplay.textContent = "";
  header.style.background = "linear-gradient(135deg, #2563eb, #1d4ed8)";

  squares.forEach((square, i) => {
    square.classList.remove("wrong");
    square.style.pointerEvents = "auto";
    if (colors[i]) {
      square.style.display = "block";
      square.style.backgroundColor = colors[i];
    } else {
      square.style.display = "none";
    }
  });
}

function updateHintBars() {
  const [r, g, b] = pickedColor.match(/\d+/g).map(Number);
  const total = r + g + b || 1;
  document.getElementById("barR").style.width = `${(r / total) * 100}%`;
  document.getElementById("barG").style.width = `${(g / total) * 100}%`;
  document.getElementById("barB").style.width = `${(b / total) * 100}%`;
}

function changeColors(color) {
  squares.forEach((square) => {
    square.classList.remove("wrong");
    square.style.backgroundColor = color;
    square.style.pointerEvents = "none";
  });
}

function pickColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function generateRandomColors(num) {
  return Array.from({ length: num }, () => randomColor());
}

function randomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}