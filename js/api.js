const API_URL = "https://worker.pistream-api.workers.dev";


async function getCurrentDigit(){

    try{

        const response = await fetch(
            `${API_URL}/api/current`
        );

        const data = await response.json();

        return data.digit;

    }
    catch(error){

        console.error("Current digit error:", error);

        return null;

    }

}



async function getDigits(start, length){

    try{

        const response = await fetch(
            `${API_URL}/api/pi?start=${start}&length=${length}`
        );

        const data = await response.json();

        return data.digits;

    }
    catch(error){

        console.error("Digit loading error:", error);

        return "";

    }

}



async function sendHeartbeat(){

    try{

        let visitorId =
            localStorage.getItem("pistream_id");


        if(!visitorId){

            visitorId =
                crypto.randomUUID();


            localStorage.setItem(
                "pistream_id",
                visitorId
            );

        }



        await fetch(
            `${API_URL}/api/heartbeat?id=${visitorId}`
        );

    }

    catch(error){

        console.error(
            "Heartbeat error:",
            error
        );

    }

}



async function getStats(){

    try{

        const response = await fetch(
            `${API_URL}/api/stats`
        );

        return await response.json();

    }
    catch(error){

        console.error("Stats error:", error);

        return {
            online:0,
            visitors:0
        };

    }

}