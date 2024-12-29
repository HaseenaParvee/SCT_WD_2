let timerInterval;
let elapsedTime = 0;
let isRunning = false;
const timeDisplay = document.getElementById("timeDisplay");
const startPauseBtn = document.getElementById("startPauseBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor((ms % 1000) / 10);
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}.${String(milliseconds).padStart(2, "0")}`;
}

function updateDisplay() {
  timeDisplay.textContent = formatTime(elapsedTime);
}

function startPauseTimer() {
  if (isRunning) {
    clearInterval(timerInterval);
    startPauseBtn.textContent = "Start";
    lapBtn.disabled = true;
  } else {
    const startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    startPauseBtn.textContent = "Pause";
    lapBtn.disabled = false;
  }
  isRunning = !isRunning;
}

function resetTimer() {
  clearInterval(timerInterval);
  elapsedTime = 0;
  isRunning = false;
  updateDisplay();
  startPauseBtn.textContent = "Start";
  lapBtn.disabled = true;
  lapsContainer.innerHTML = "";
}

function recordLap() {
  const lapTime = formatTime(elapsedTime);
  const lapElement = document.createElement("li");
  lapElement.textContent = `Lap ${lapsContainer.childElementCount + 1}: ${lapTime}`;
  lapsContainer.appendChild(lapElement);
}

startPauseBtn.addEventListener("click", startPauseTimer);
resetBtn.addEventListener("click", resetTimer);
lapBtn.addEventListener("click", recordLap);

updateDisplay();
