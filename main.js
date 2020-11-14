var stopPushed = false;
var isRunning = false;

var audio = document.getElementById("ding");
var output = document.getElementById("output");
var cnt = document.getElementById("counter");

function startTimer() {
    if (isRunning) return;

    output.innerHTML = "";
    cnt.innerHTML = "";
    output.style = "color: black";
    
    isRunning = true;    
    stopPushed = false;
    
    var timeMins = document.getElementById("amt").value;
    var repeat = document.getElementById("rep").value;

    // Grab control for mobile playback of sound
    audio.play();

    // Set source of sound
    audio.src = 'ding3.wav';

    var timeSecs = timeMins * 60;
    var counter = 0;
    
    // Reset display

    var x = setInterval(function () {
        
        // If stop button is pushed
        if (stopPushed) {
            clearInterval(x);
            output.innerHTML = "STOPPED";
            output.style = "color: green";
            stopPushed = false;
            isRunning = false;
            return;
        }

        // Parse seconds into mins and secs
        mins = Math.floor(timeSecs / 60);
        secs = timeSecs % 60;
    
        function checkTime(i) {
            if (i < 10) {
              i = "0" + i;
            }
            return i;
        }

        mins = checkTime(mins);
        secs = checkTime(secs);

        // Display the time remaining in the element with id="output"
        output.innerHTML = "Time remaining: " + mins + ":" + secs;
        timeSecs--;

        // If the count down is finished, write expired in red
        if (timeSecs < 0 && repeat == 1) {
            clearInterval(x);
            output.style = "color: red";
            output.innerHTML = "EXPIRED";
            if (counter > 0) {
                counter++;
                cnt.innerHTML = "Counter = " + counter;
            }
            audio.src="done.wav"
            audio.play()
            isRunning = false;
            return;
        }
        // If repeat is selected, a counter appears with the current count
        // and the timer is reset.
        else if (timeSecs < 0 && repeat > 1) {
            counter++;
            cnt.innerHTML = "Counter = " + counter;
            audio.play()
            timeSecs = timeMins * 60;
            repeat--;
        }
    }, 1000);
}