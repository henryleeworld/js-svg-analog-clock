const DEGREES = 360;
const SEC_IN_MIN = 60;
const MIN_IN_HOUR = 60;
const HOUR_IN_LOOP = 12;
const SEC_IN_HOURS = 3600;
const DEGREES_PER_MIN = DEGREES / MIN_IN_HOUR;
const DEGREES_PER_HOUR = DEGREES / HOUR_IN_LOOP;
const SECOND_DEGREES_PER_SECOND = DEGREES / SEC_IN_MIN;
const MINUTE_DEGREES_PER_SECOND = SECOND_DEGREES_PER_SECOND / MIN_IN_HOUR;
const HOUR_DEGREES_PER_SECOND = MINUTE_DEGREES_PER_SECOND / HOUR_IN_LOOP;
let tl = new TimelineMax();

let moveSeconds = () => {
    TweenMax.to('.analog-second', 1, {
        rotation: "+=" + SECOND_DEGREES_PER_SECOND,
        onComplete: () => {
            moveSeconds();
        }
    });

};

let moveMinutes = () => {
    TweenMax.to('.analog-minute', 1, {
        rotation: "+=" + MINUTE_DEGREES_PER_SECOND,
        onComplete: () => {
            moveMinutes();
        }
    });

};

let moveHours = () => {
    TweenMax.to('.analog-hour', 1, {
        rotation: "+=" + HOUR_DEGREES_PER_SECOND,
        onComplete: () => {
            moveHours();
        }
    });

};

let getCurrentTime = () => {
    let t = new Date();
    let hours = t.getHours() % 12;
    hours = hours ? hours : 12;
    return {
        hours: hours >= 10 ? hours : '0' + hours,
        minutes: t.getMinutes() >= 10 ? t.getMinutes() : '0' + t.getMinutes(),
        seconds: t.getSeconds() >= 10 ? t.getSeconds() : '0' + t.getSeconds()
    };

};

let updateDigitalClock = time => {
    let $hours = $('.digital-hour');
    let $minutes = $('.digital-minute');
    let $seconds = $('.digital-second');

    $hours.text(time.hours);
    $minutes.text(time.minutes);
    $seconds.text(time.seconds);
};

let startClocks = () => {
    let t = getCurrentTime();
    let intHours = parseInt(t.hours, 10);
    let intMins = parseInt(t.minutes, 10);
    let intSecs = parseInt(t.seconds, 10);
    let secDegrees = intSecs * SECOND_DEGREES_PER_SECOND - SECOND_DEGREES_PER_SECOND;
    let minDegrees = (intMins + intSecs / SEC_IN_MIN) * DEGREES_PER_MIN;
    let hourDegrees = (intHours + intMins / MIN_IN_HOUR + intSecs / SEC_IN_HOURS) * DEGREES_PER_HOUR;


    // Setting load time on Digital Clock
    updateDigitalClock(t);

    // Setting load time on Analog Clock
    TweenMax.set('.analog-second', {
        svgOrigin: "1 1",
        rotation: secDegrees
    });


    TweenMax.set('.analog-minute', {
        svgOrigin: "0 0",
        rotation: minDegrees
    });


    TweenMax.set('.analog-hour', {
        svgOrigin: '0 0',
        rotation: hourDegrees
    });


    // Starting Analog Clock
    moveSeconds();
    moveMinutes();
    moveHours();

    // Starting Digital Clock
    setInterval(function() {
        t = getCurrentTime();
        updateDigitalClock(t);
    }, 1000);
};

startClocks();