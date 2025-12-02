const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const equals = document.getElementById("equals");
const clear = document.getElementById("clear");
const historyList = document.getElementById("historyList");

let currentInput = "";

// Load history from localStorage
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];
updateHistory();

// ----- Mouse Click Support -----
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.getAttribute("data-value");

    if (value) {
      currentInput += value;
      display.value = currentInput;
    }
  });
});

equals.addEventListener("click", () => calculate());
clear.addEventListener("click", () => resetCalculator());

// ----- Keyboard Support -----
document.addEventListener("keydown", (event) => {
  const key = event.key;

  // Numbers and decimal
  if ((key >= "0" && key <= "9") || key === ".") {
    currentInput += key;
    display.value = currentInput;
  }

  // Operators
  if (["+", "-", "*", "/"].includes(key)) {
    currentInput += key;
    display.value = currentInput;
  }

  // Enter = calculate
  if (key === "Enter") calculate();

  // Escape = clear
  if (key === "Escape") resetCalculator();

  // Backspace = remove last character
  if (key === "Backspace") {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
  }
});

// ----- Functions -----
function calculate() {
  if (currentInput === "") return;
  try {
    const result = eval(currentInput);
    addToHistory(currentInput + " = " + result);
    display.value = result;
    currentInput = result.toString();
  } catch {
    display.value = "Error";
    currentInput = "";
  }
}

function resetCalculator() {
  currentInput = "";
  display.value = "";
}

// ----- History -----
function addToHistory(entry) {
  history.unshift(entry);
  if (history.length > 10) history.pop(); // Keep last 10
  localStorage.setItem("calcHistory", JSON.stringify(history));
  updateHistory();
}

function updateHistory() {
  historyList.innerHTML = "";
  history.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}
const clearHistoryBtn = document.getElementById("clearHistory");

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  localStorage.removeItem("calcHistory");
  updateHistory();
});
