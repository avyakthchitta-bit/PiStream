const START_TIME = new Date(Date.now() - 1000);

const PI_DIGITS =
"14159265358979323846264338327950288419716939937510" +
"58209749445923078164062862089986280348253421170679" +
"82148086513282306647093844609550582231725359408128" +
"48111745028410270193852110555964462294895493038196" +
"44288109756659334461284756482337867831652712019091";


const digitNumber = document.getElementById("digit-number");
const piDisplay = document.getElementById("pi-display");
const runningTime = document.getElementById("running-time");

const searchInput = document.getElementById("search");
const goButton = document.getElementById("go-btn");

const modeStatus = document.getElementById("mode-status");
const liveButton = document.getElementById("live-btn");


let viewingMode = false;


function getCurrentDigit(){

    return Math.floor(
        (Date.now() - START_TIME.getTime()) / 1000
    );

}


function renderPi(position){

    const visible =
        PI_DIGITS.substring(
            0,
            Math.min(position, PI_DIGITS.length)
        );

    piDisplay.textContent =
        "3." + visible + "│";

}


function updatePage(){

    if(viewingMode)
        return;


    const digit = getCurrentDigit();


    digitNumber.textContent =
        `Digit #${digit.toLocaleString()}`;


    const days = Math.floor(digit / 86400);
    const hours = Math.floor((digit % 86400) / 3600);
    const minutes = Math.floor((digit % 3600) / 60);


    runningTime.textContent =
        `${days}d ${hours}h ${minutes}m`;


    renderPi(digit);

}



goButton.addEventListener("click",()=>{

    const value = parseInt(searchInput.value);


    if(isNaN(value))
        return;


    viewingMode = true;


    modeStatus.textContent="VIEWING";
    modeStatus.classList.add("viewing");


    liveButton.classList.remove("hidden");


    digitNumber.textContent =
        `Viewing Digit #${value.toLocaleString()}`;


    renderPi(value);

});



liveButton.addEventListener("click",()=>{

    viewingMode=false;


    modeStatus.textContent="LIVE";
    modeStatus.classList.remove("viewing");


    liveButton.classList.add("hidden");


    updatePage();

});



searchInput.addEventListener("keydown",(e)=>{

    if(e.key==="Enter")
        goButton.click();

});



updatePage();

setInterval(updatePage,1000);