const API_URL = "http://localhost:8787";


async function getCurrentDigit(){

    try{

        const response = await fetch(
            `${API_URL}/api/current`
        );

        const data = await response.json();

        return data.digit;

    }

    catch(error){

        console.error(
            "API error:",
            error
        );

        return null;

    }

}