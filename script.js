document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const lapResetBtn = document.getElementById('lapResetBtn');
    const lapsList = document.getElementById('lapsList');

    let timer; // Holds setInterval reference
    let isRunning = false; // Flag to check if stopwatch is running
    let elapsedTime = 0; // Total time elapsed in milliseconds
    let startTime = 0; // Time when stopwatch was last started/resumed
    let lapCounter = 0; // Counts the number of laps

    // --- Time Formatting Function ---
    function formatTime(ms) {
        const date = new Date(ms);
        const hours = String(date.getUTCHours()).padStart(2, '0');
        const minutes = String(date.getUTCMinutes()).padStart(2, '0');
        const seconds = String(date.getUTCSeconds()).padStart(2, '0');
        const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    }

    // --- Update Display ---
    function updateDisplay() {
        const currentTime = Date.now();
        elapsedTime = currentTime - startTime; // Update elapsedTime based on current run
        display.textContent = formatTime(elapsedTime);
    }

    // --- Start Stopwatch ---
    function startStopwatch() {
        if (!isRunning) {
            isRunning = true;
            startTime = Date.now() - elapsedTime; // Adjust startTime to account for previous elapsed time
            timer = setInterval(updateDisplay, 10); // Update every 10 milliseconds
            startPauseBtn.textContent = 'Pause';
            startPauseBtn.classList.remove('start');
            startPauseBtn.classList.add('pause');
            lapResetBtn.textContent = 'Lap';
            lapResetBtn.classList.remove('reset');
            lapResetBtn.classList.add('lap');
        }
    }

    // --- Pause Stopwatch ---
    function pauseStopwatch() {
        if (isRunning) {
            isRunning = false;
            clearInterval(timer);
            startPauseBtn.textContent = 'Start';
            startPauseBtn.classList.remove('pause');
            startPauseBtn.classList.add('start');
            lapResetBtn.textContent = 'Reset';
            lapResetBtn.classList.remove('lap');
            lapResetBtn.classList.add('reset');
        }
    }

    // --- Reset Stopwatch ---
    function resetStopwatch() {
        pauseStopwatch(); // Ensure it's paused first
        elapsedTime = 0;
        lapCounter = 0;
        display.textContent = '00:00:00.000';
        lapsList.innerHTML = ''; // Clear all lap times
        lapResetBtn.textContent = 'Lap'; // Back to initial state
        lapResetBtn.classList.remove('reset');
        lapResetBtn.classList.add('lap');
    }

    // --- Record Lap Time ---
    function recordLap() {
        if (isRunning) {
            lapCounter++;
            const lapTime = formatTime(elapsedTime); // Current total time
            const listItem = document.createElement('li');
            listItem.innerHTML = `<span>Lap ${lapCounter}:</span> <span>${lapTime}</span>`;
            lapsList.prepend(listItem); // Add new lap to the top of the list
        }
    }

    // --- Event Listeners ---
    startPauseBtn.addEventListener('click', () => {
        if (isRunning) {
            pauseStopwatch();
        } else {
            startStopwatch();
        }
    });

    lapResetBtn.addEventListener('click', () => {
        if (isRunning) {
            recordLap();
        } else {
            resetStopwatch();
        }
    });
});