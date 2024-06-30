let startTime, updatedTime, difference, tInterval, savedTime;
let running = false;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', start);
document.getElementById('pause').addEventListener('click', pause);
document.getElementById('reset').addEventListener('click', reset);
document.getElementById('lap').addEventListener('click', lap);

function start() {
    if (!running) {
        startTime = new Date().getTime() - (savedTime || 0);
        tInterval = setInterval(getShowTime, 10);
        running = true;
    }
}

function pause() {
    if (running) {
        clearInterval(tInterval);
        savedTime = difference;
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    savedTime = 0;
    running = false;
    display.innerHTML = '00:00:00.00';
    lapsList.innerHTML = '';
}

function lap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.innerHTML;
        lapsList.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);

    display.innerHTML = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 2)}`;
}

function pad(number, digits = 2) {
    return number.toString().padStart(digits, '0');
}
