// selectors
const stopwatchItem = document.querySelector('.stopwatch-item');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const milliseconds = document.querySelector('.milliseconds');
const stopwatchLap = document.querySelector('.stopwatch-lap');
const btnStart = document.querySelector('.btn-start');
const btnStop = document.querySelector('.btn-stop');
const btnReset = document.querySelector('.btn-reset');
const btnLap = document.querySelector('.btn-lap');

// increments variables
let milliIncrementor = 0;
let secondsIncrementor = 0;
let minutesIncrementor = 0;
let hoursIncrementor = 0;

// default stopwatch view
let defaultLap = null;
const defaults = () => {
    milliIncrementor = 0;
    secondsIncrementor = 0;
    minutesIncrementor = 0;
    hoursIncrementor = 0;
    milliseconds.textContent = '00';
    hours.textContent = '00:';
    minutes.textContent = '00:';
    seconds.textContent = '00.';
    btnStop.setAttribute('style', 'display:none;')
    btnReset.setAttribute('style', 'display:none;')
    defaultLap = stopwatchItem.textContent.valueOf();
}


// Increment functions
const milliIncrement = () => {
    milliIncrementor += 1;
    milliseconds.textContent = milliIncrementor;
}

const secondsIncrement = () => {
    if (milliIncrementor === 200) {
        secondsIncrementor += 1;
        if (secondsIncrementor < 10) {
            seconds.textContent = '0' + secondsIncrementor + '.';
        } else {
            seconds.textContent = secondsIncrementor + '.';
        }
        milliIncrementor = 0;
    }
}

const minutesIncrement = () => {
    if (secondsIncrementor === 60) {
        minutesIncrementor += 1;
        if (minutesIncrementor < 10) {
            minutes.textContent = '0' + minutesIncrementor + ':';
        } else {
            minutes.textContent = minutesIncrementor + ':';
        }
        secondsIncrementor = 0;
    }
}

const hoursIncrement = () => {
    if (minutesIncrementor === 60) {
        hoursIncrementor += 1;
        if (hoursIncrementor < 10) {
            hours.textContent = '0' + hoursIncrementor + ':';
        } else {
            hours.textContent = hoursIncrementor + ':';
        }
        minutesIncrementor = 0;
    }
}

// default call
defaults();


// increment calls 
const increment = () => {
    milliIncrement();
    secondsIncrement();
    minutesIncrement();
    hoursIncrement();
}

// timing by setInterval
let timer = null;
const start = () => {
    btnStart.setAttribute('style', 'display:none;')
    btnReset.setAttribute('style', 'display:none;')
    btnStop.removeAttribute('style')
    btnLap.removeAttribute('style')
    timer = setInterval(increment, 1);
}

// stop stopwatch timing
const stop = () => {
    btnStop.setAttribute('style', 'display:none;')
    btnLap.setAttribute('style', 'display:none;')
    btnStart.removeAttribute('style')
    btnReset.removeAttribute('style')
    clearInterval(timer);
}

// get laps - time past since starting stopwatch
let lapsClassList = [];
const laps = () => {
    let currentLap = stopwatchItem.textContent.valueOf();
    if (currentLap !== defaultLap) {
        let p = document.createElement('p');
        p.classList.add('lap');
        p.textContent = currentLap.trim();
        stopwatchLap.appendChild(p);
        lapsClassList = [...p.classList];
    }

}

// reset stopwatch to default view
const reset = () => {
    stop();
    defaults();
    if (lapsClassList.includes('lap')) {
        const laps_p_tags = document.querySelectorAll('.lap');
        laps_p_tags.forEach(p => {
            p.remove();
        });
    };
    btnLap.removeAttribute('style')
}

// split