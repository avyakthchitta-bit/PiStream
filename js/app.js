const digitNumber = document.getElementById("digit-number");
const digitsContainer = document.getElementById("digits");
const runningTime = document.getElementById("running-time");

const onlineCount = document.getElementById("online-count");
const visitorCount = document.getElementById("visitor-count");

const searchInput = document.getElementById("search");
const goButton = document.getElementById("go-btn");

const modeStatus = document.getElementById("mode-status");
const liveButton = document.getElementById("live-btn");


let displayedDigits = 0;
let viewingMode = false;
let loadedDigits = "";



async function addDigit(number){

    if(number > loadedDigits.length){

        const newDigits = await getDigits(
            loadedDigits.length,
            100
        );

        loadedDigits += newDigits;

    }


    const span = document.createElement("span");

    span.textContent =
        loadedDigits[number - 1] ?? "?";


    span.classList.add("digit-new");

    digitsContainer.appendChild(span);


    setTimeout(() => {
        span.classList.remove("digit-new");
    }, 400);

}




async function updatePage(){

    if(viewingMode)
        return;


    const current = await getCurrentDigit();


    if(current === null)
        return;


    digitNumber.textContent =
        `Digit #${current.toLocaleString()}`;



    const days = Math.floor(current / 86400);

    const hours = Math.floor(
        (current % 86400) / 3600
    );

    const minutes = Math.floor(
        (current % 3600) / 60
    );


    runningTime.textContent =
        `${days}d ${hours}h ${minutes}m`;



    while(displayedDigits < current){

        displayedDigits++;

        await addDigit(displayedDigits);

    }

}




async function updateStats(){

    await sendHeartbeat();


    const stats = await getStats();


    if(onlineCount)
        onlineCount.textContent = stats.online;


    if(visitorCount)
        visitorCount.textContent = stats.visitors;

}




goButton.addEventListener("click", async () => {

    const value = parseInt(searchInput.value);


    if(isNaN(value))
        return;


    viewingMode = true;


    if(modeStatus){

        modeStatus.textContent = "VIEWING";

        modeStatus.classList.add("viewing");

    }


    if(liveButton)
        liveButton.classList.remove("hidden");



    digitNumber.textContent =
        `Viewing Digit #${value.toLocaleString()}`;



    digitsContainer.innerHTML = "";



    const digits = await getDigits(
        0,
        value
    );



    for(let i = 0; i < digits.length; i++){

        const span = document.createElement("span");

        span.textContent = digits[i];

        digitsContainer.appendChild(span);

    }

});





if(liveButton){

    liveButton.addEventListener("click",()=>{

        viewingMode = false;


        if(modeStatus){

            modeStatus.textContent = "LIVE";

            modeStatus.classList.remove("viewing");

        }


        liveButton.classList.add("hidden");


        digitsContainer.innerHTML = "";

        displayedDigits = 0;

        loadedDigits = "";


        updatePage();

    });

}





updatePage();

updateStats();


setInterval(updatePage,1000);

setInterval(updateStats,10000);