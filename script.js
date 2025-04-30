class PomodoroTimer {
    constructor() {
        this.timeLeft = 25 * 60; // 25 minutes in seconds
        this.timerId = null;
        this.isRunning = false;
        
        this.timeDisplay = document.querySelector('.time-display');
        this.startButton = document.getElementById('start');
        this.resetButton = document.getElementById('reset');
        this.modeButtons = document.querySelectorAll('.mode');
        this.timerSound = document.getElementById('timerSound');
        
        this.initializeEventListeners();
        this.updateDisplay();
    }
    
    initializeEventListeners() {
        this.startButton.addEventListener('click', () => this.toggleTimer());
        this.resetButton.addEventListener('click', () => this.resetTimer());
        
        this.modeButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.modeButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                this.timeLeft = parseInt(button.dataset.time) * 60;
                this.updateDisplay();
                if (this.isRunning) {
                    this.resetTimer();
                }
            });
        });
    }
    
    toggleTimer() {
        if (this.isRunning) {
            this.pauseTimer();
        } else {
            this.startTimer();
        }
    }
    
    startTimer() {
        this.isRunning = true;
        this.startButton.textContent = 'Pause';
        this.timerId = setInterval(() => {
            this.timeLeft--;
            this.updateDisplay();
            
            if (this.timeLeft <= 0) {
                this.timerSound.play();
                this.resetTimer();
            }
        }, 1000);
    }
    
    pauseTimer() {
        this.isRunning = false;
        this.startButton.textContent = 'Start';
        clearInterval(this.timerId);
    }
    
    resetTimer() {
        this.pauseTimer();
        const activeMode = document.querySelector('.mode.active');
        this.timeLeft = parseInt(activeMode.dataset.time) * 60;
        this.updateDisplay();
        document.title = "Pomodoro Timer";
    }
    
    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        this.timeDisplay.textContent = timeString;
        document.title = `${timeString} - Pomodoro Timer`;
    }
}

// Initialize the timer when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PomodoroTimer();
}); 