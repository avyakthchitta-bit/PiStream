const START_TIME = new Date(Date.now() - 30 * 1000);


function corsHeaders(){

    return {

        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type"

    };

}



export default {

    async fetch(request) {

        const url = new URL(request.url);


        if(request.method === "OPTIONS"){

            return new Response(null,{
                headers:corsHeaders()
            });

        }



        if(url.pathname === "/api/health"){

            return Response.json(
                {
                    status:"online",
                    service:"PiStream API",
                    version:"1.0"
                },
                {
                    headers:corsHeaders()
                }
            );

        }



        if(url.pathname === "/api/current"){

            const seconds = Math.max(
                0,
                Math.floor(
                    (Date.now()-START_TIME.getTime())/1000
                )
            );


            return Response.json(
                {
                    digit:seconds
                },
                {
                    headers:corsHeaders()
                }
            );

        }



        return Response.json(
            {
                message:"Welcome to PiStream API"
            },
            {
                headers:corsHeaders()
            }
        );

    }

};