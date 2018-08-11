let countdown; /* Variable to control/stop setInterval below im timer-function */

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]'); /* Get everything that has a data-time attribute! */

function timer(seconds){
    /* Start off by clearing any existing countdowns! Just do it allright! Probably do this a habit, too. */
    clearInterval(countdown);
    
    const now = Date.now();
    const then = now + (seconds * 1000); /* seconds to ms */
    
    displayTimeLeft(seconds); /* Display seconds, right from the start! */
    displayEndTime(then);
    
    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000); /* ms to seconds + round it off */
        /* Check if we should stop it */
        if(secondsLeft < 0){
            /* We can't just have setInterval and say return here because interval will still run. 
            Thus we ADD variable COUNTDOWN! And then clearInterval when less than 0. */
            clearInterval(countdown);
            return;
        }
        /* Continue to continuesely display seconds left here! */
        displayTimeLeft(secondsLeft)
    }, 1000);  
}    

function displayTimeLeft(seconds){
    
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    /* If it's less than 10 seconds remaining we need to add a 0 infront of the remaining seconds! */
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display; /* Make the remaining time the page title :))) */
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    /* From "end" which is Date-"object" we can just substract hours, minutes, days, etc with attached methods! Great! */
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${hour}:${minutes}`; /* European time, but if...

    ...you need 12-hour format a.k.a. am/pm a.k.a. american time, it requires some further work.
    Also, ternaries can be used like this (!):
    
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`; */
}
    
function startTimer(){
    console.log(this);
    /* In DOM: attribute data-time. In JS: dataset.time.
    Also parse from string to realz number/int */
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

/* In DOM: form name = "cosumForm", we can add eventlistener directly: */
document.customForm.addEventListener('submit', function(e){
    e.preventDefault(); /* Stop from submiting (update page)! */
    /* In DOM: input name = minutes. We want the value of that input. */
    const mins = this.minutes.value;
    timer(mins * 60); /* passing seconds into timer() */
    this.reset(); /* CLEARING THE INPUT WITH .RESET()!!!! */
});
    
