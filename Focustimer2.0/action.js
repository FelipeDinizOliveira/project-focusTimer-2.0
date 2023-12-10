import * as sounds from "./sounds.js";
import * as elements from "./elements.js"
export function initializeAudioPlayer() {
  let currentSound = null;

  sounds.buttonplay.forEach(function (button, index) {
    button.addEventListener("click", function () {
      // Verifica se foi dos cliques no mesmo btn
      const doubleClick =
        currentSound && currentSound === sounds.audioplay[index];

      // Retorna estado anterior
      if (doubleClick) {
        button.style.backgroundColor = "";
        button.style.color = "";
        currentSound.pause();
        currentSound = null;
      } else {
        // reset btn
        sounds.buttonplay.forEach(function (b) {
          b.style.backgroundColor = "";
          b.style.color = "";
        });

        button.style.backgroundColor = "#02799D";
        button.style.color = "#ffffff";

        // Pausa o áudio
        if (currentSound) {
          currentSound.pause();
        }

        // Inicia áudio
        sounds.audioplay[index].play();
        currentSound = sounds.audioplay[index];
      }
    });
  });
}
export function initializeTemporizador() {
  let minutes = 25;
  let seconds = 0;
  let intervalId;

  function updateDisplay() {
    elements.minutesSpan.textContent = minutes.toString().padStart(2, "0");
    elements.secondsSpan.textContent = seconds.toString().padStart(2, "0");
  }

  function startTimer() {
    intervalId = setInterval(function () {
      if (minutes === 0 && seconds === 0) {
        clearInterval(intervalId);
      } else if (seconds === 0) {
        minutes--;
        seconds = 59;
      } else {
        seconds--;
      }

      updateDisplay();
    }, 1000);
  }
  function pauseTimer() {
    clearInterval(intervalId);
  }

  function resetTimer() {
    clearInterval(intervalId);
    minutes = 25;
    seconds = 0;
    updateDisplay();
  }

  function increaseMinutes() {
    if (minutes < 20) {
      minutes += 5;
      updateDisplay();
    } else {
      minutes = 25;
      seconds = 0;
      updateDisplay();
    }
  }

  function decreaseMinutes() {
    if (minutes >= 5) {
      minutes -= 5;
      updateDisplay();
    } else {
      minutes = 0;
      seconds = 0;
    }
  }

  elements.playButton.addEventListener("click", function () {
    startTimer();
    document.documentElement.classList.toggle("running");
  });
  elements.pauseButton.addEventListener("click", function () {
    document.documentElement.classList.toggle("running");
    pauseTimer();
  });

  elements.resetButton.addEventListener("click", function () {
    resetTimer();
    document.documentElement.classList.toggle("running");
  });
  elements.increaseButton.addEventListener("click", function () {
    increaseMinutes();
  });

  elements.decreaseButton.addEventListener("click", function () {
    decreaseMinutes();
  });

  // Inicializa o cronômetro com os valores padrão
  updateDisplay();
}
