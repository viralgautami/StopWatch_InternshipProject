let startTime = 0;
let updatedTime = 0;
let difference = 0;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const laps = document.getElementById('laps');

startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = Date.now() - difference;
        tInterval = setInterval(getShowTime, 1);
        running = true;
        updateButtonStyles(startBtn, "#4CAF50", "#FFFFFF");
        updateButtonStyles(pauseBtn, "#E57373", "#FFFFFF");
        updateButtonStyles(resetBtn, "#64B5F6", "#FFFFFF");
        updateButtonStyles(lapBtn, "#81C784", "#FFFFFF");
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = Date.now() - startTime;
        running = false;
        updateButtonStyles(startBtn, "#81C784", "#FFFFFF");
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00';
    laps.innerHTML = '';
    lapCounter = 0;
    updateButtonStyles(startBtn, "#81C784", "#FFFFFF");
    updateButtonStyles(pauseBtn, "#E57373", "#FFFFFF");
    updateButtonStyles(resetBtn, "#64B5F6", "#FFFFFF");
    updateButtonStyles(lapBtn, "#81C784", "#FFFFFF");
}

function getShowTime() {
    updatedTime = Date.now() - startTime;
    let hours = Math.floor((updatedTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((updatedTime % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((updatedTime % (1000 * 60)) / 1000);
    display.innerHTML = `${(hours > 9 ? hours : "0" + hours)}:${(minutes > 9 ? minutes : "0" + minutes)}:${(seconds > 9 ? seconds : "0" + seconds)}`;
}

function recordLap() {
    if (running) {
        lapCounter++;
        let li = document.createElement('li');
        li.innerHTML = `Lap ${lapCounter}: ${display.innerHTML}`;
        laps.appendChild(li);
        li.style.padding = '10px';
        li.style.borderBottom = '1px solid #BBDEFB';
        li.style.color = '#34495E';
    }
}

function updateButtonStyles(button, bgColor, textColor) {
    button.style.backgroundColor = bgColor;
    button.style.color = textColor;
}
