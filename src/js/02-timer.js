
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const flatpickr = require("flatpickr");

let timerDeadline = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        console.log(selectedDates[0]);
        timerDeadline = selectedDates[0].getTime();
        console.log(timerDeadline);
        if (timerDeadline < Date.now()) {
            alert('Please choose a date in the future');
            btnStartRef.setAttribute('disabled', true);
        } else {
            btnStartRef.toggleAttribute('disabled');
        }
    },
};


// console.log(timerDeadline);

flatpickr("#datetime-picker", options);

const btnStartRef = document.querySelector('[data-start]');
btnStartRef.setAttribute('disabled', false);
btnStartRef.addEventListener('click', onBtnStart);

function onBtnStart() {
    // event.preventDefault();
    timer.start();
}


const timerRef = document.querySelector('.timer');
// console.log(timerRef);

const timer = {
    intervalId: null,
    refs: {},
    start(rootSelector, deadline) {
        const delta = timerDeadline - Date.now();
        // console.log(delta);
        this.getRefs(rootSelector);
        this.intervalId = setInterval(() => {
            const delta = timerDeadline - Date.now();

            if (delta <= 0) {
                clearInterval(intervalId)
            };
            
            const data = this.convertMs(delta);
            // console.log(data);
            this.refs.days.textContent = this.addLeadinZero(data.days);
            this.refs.hours.textContent = this.addLeadinZero(data.hours);
            this.refs.minutes.textContent = this.addLeadinZero(data.minutes);
            this.refs.seconds.textContent = this.addLeadinZero(data.seconds);
        }, 1000)
    },
    getRefs(rootSelector) {
        this.refs.days = rootSelector.querySelector('[data-days]');
        this.refs.hours = rootSelector.querySelector('[data-hours]');
        this.refs.minutes = rootSelector.querySelector('[data-minutes]');
        this.refs.seconds = rootSelector.querySelector('[data-seconds]');
        // console.log(this.refs);
    },

    convertMs(delta) {
        const days = Math.floor(delta / 1000 / 60 / 60 / 24);
        const hours = Math.floor(delta / 1000 / 60 / 60) % 24;
        const minutes = Math.floor(delta / 1000 / 60) % 60;
        const seconds = Math.floor(delta / 1000) % 60;
        return { days, hours, minutes, seconds };
    },
    addLeadinZero(value) {
        return String(value).padStart(2, '0');
    }

};



timer.start(timerRef, timerDeadline);