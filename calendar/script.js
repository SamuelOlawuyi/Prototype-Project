const selectMonth = document.querySelector('select');
const yearInput = document.querySelector('input');
const timeNow = document.querySelector('footer');
const calendarHeader = document.querySelector('.month-year');
const days = document.querySelector('.days');
const months = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
];
const weekdays = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];

months.forEach(month => {
    const option = document.createElement('option');
    option.innerHTML = option.value = month;
    selectMonth.append(option);
});

weekdays.forEach(week => {
    const weekday = document.createElement('li');
    weekday.innerHTML = week;
    document.querySelector('.weekdays').append(weekday);
});

let now = new Date();
let month = months[now.getMonth()];
let year = now.getFullYear();
timeNow.innerHTML = `${now.toDateString()}, ${now.toLocaleTimeString()}`;

createCalendar();

selectMonth.addEventListener('change', () => yearInput.focus());
yearInput.addEventListener('input', () => yearInput.value = Number(yearInput.value).toString().padStart(4, 0));
document.querySelector('form').addEventListener('submit', handleSubmit);
document.querySelector('.prev').addEventListener('click', gotoPrevMonth);
document.querySelector('.next').addEventListener('click', gotoNextMonth);
timeNow.addEventListener('click', gotoToday);

// Updates the value of 'now' every second
setInterval(() => {
    now = new Date();
    timeNow.innerHTML = `${now.toDateString()}, ${now.toLocaleTimeString()}`;
}, 1000);

function createCalendar() {
    const [countdays, daysOfMonth] = countDateTime();
    const year0 = year.toString().padStart(4, 0);

    selectMonth.value = month;
    yearInput.value = year0;
    calendarHeader.innerHTML = `${month} ${year0}`;
    days.innerHTML = '';

    // Fill blank days of month
    for (let i = 1; i <= (countdays - daysOfMonth) % 7; i++) {
        const day = document.createElement('li');
        day.className = 'empty-day';
        days.append(day);
        // day.onclick = gotoPrevMonth;
    }
    // Fill numbered days of month
    for (let i = 1; i <= daysOfMonth; i++) {
        const day = document.createElement('li');
        day.innerHTML = `<a href="${googleSearch(i, month, year)}">${i}</a>`
        days.append(day);
        if (year === now.getFullYear() && month === months[now.getMonth()] && i === now.getDate()) {
            day.id = 'today';
        }
        day.setAttribute('title', countdays - daysOfMonth + i);
    }
}

function handleSubmit(e) {
    e.preventDefault();
    month = selectMonth.value;
    year = Number(yearInput.value);
    yearInput.blur();
    createCalendar();
}

function countDateTime(startyear=1) {
    let [countdays, daysOfMonth] = [0, 0];
    for (let y = startyear; y <= year; y++) {
        let stopCount = false;
        for (let m = 0; m < 12; m++) {
            if (m === 1) {  // February
                if (y % 4 === 0 && y % 100 !== 0 || y % 400 === 0) {  // Leap year
                    daysOfMonth = 29;
                } else { // other year
                    daysOfMonth = 28;
                }
            } else if ([8, 3, 5, 10].includes(m)) {
                daysOfMonth = 30;
            } else {
                daysOfMonth = 31;
            }
            countdays += daysOfMonth;
            if (y === year && m === months.indexOf(month)) {
                stopCount = true;
                break;
            }
        }
        if (stopCount) break;
    }
    return [countdays, daysOfMonth];
}

function gotoPrevMonth() {
    if (year.toString() === yearInput.getAttribute('min') && month === months[0]) {
        return;
    }
    let m = months.indexOf(month) - 1;
    if (m < 0) {
        month = months[11];
        year -= 1;
    } else {
        month = months[m];
    }
    createCalendar();
}

function gotoNextMonth() {
    if (year.toString() === yearInput.getAttribute('max') && month === months[11]) {
        return;
    }
    let m = months.indexOf(month) + 1;
    if (m > 11) {
        month = months[0];
        year += 1;
    } else {
        month = months[m];
    }
    createCalendar();
}

function gotoToday(){
    month = months[now.getMonth()];
    year = now.getFullYear();
    createCalendar();
}

function googleSearch(day, month, year) {
    const query = `${day}+${month}+${year}`;
    return 'https://www.google.com/search?q=' + query;
}