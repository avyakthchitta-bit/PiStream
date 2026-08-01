const START_TIME = new Date(Date.now() - 30000);


const PI_DIGITS =
"14159265358979323846264338327950288419716939937510" +
"58209749445923078164062862089986280348253421170679" +
"82148086513282306647093844609550582231725359408128" +
"48111745028410270193852110555964462294895493038196" +
"44288109756659334461284756482337867831652712019091";


const digitNumber = document.getElementById("digit-number");
const digitsContainer = document.getElementById("digits");
const runningTime = document.getElementById("running-time");


const searchInput = document.getElementById("search");
const goButton = document.getElementById("go-btn");


const modeStatus = document.getElementById("mode-status");
const liveButton = document.getElementById("live-btn");


let displayedDigits = 0;
let viewingMode = false;



function getCurrentDigit(){

    return Math.floor(
        (Date.now()-START_TIME.getTime())/1000
    );

}



function addDigit(number){

    const span=document.createElement("span");

    span.textContent =
        PI_DIGITS[number-1] ?? "?";

    span.classList.add("digit-new");

    digitsContainer.appendChild(span);


    setTimeout(()=>{
        span.classList.remove("digit-new");
    },400);

}



function updatePage(){

    if(viewingMode)
        return;


    const current=getCurrentDigit();


    digitNumber.textContent =
        `Digit #${current.toLocaleString()}`;


    const days=Math.floor(current/86400);
    const hours=Math.floor((current%86400)/3600);
    const minutes=Math.floor((current%3600)/60);


    runningTime.textContent =
        `${days}d ${hours}h ${minutes}m`;


    while(displayedDigits < current){

        displayedDigits++;

        addDigit(displayedDigits);

    }

}



goButton.addEventListener("click",()=>{

    const value=parseInt(searchInput.value);

    if(isNaN(value))
        return;


    viewingMode=true;


    modeStatus.textContent="VIEWING";
    modeStatus.classList.add("viewing");


    liveButton.classList.remove("hidden");


    digitNumber.textContent =
        `Viewing Digit #${value}`;


});



liveButton.addEventListener("click",()=>{

    viewingMode=false;


    modeStatus.textContent="LIVE";
    modeStatus.classList.remove("viewing");


    liveButton.classList.add("hidden");

});



updatePage();

setInterval(updatePage,1000);