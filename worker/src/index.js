const START_TIME = new Date(Date.now() - 30000);

const ONLINE_TIMEOUT = 60;

const PI_URL =
"https://raw.githubusercontent.com/avyakthchitta-bit/PiStream/0bcdf8486e3d6b200413107c8cbbc6dcd16be771/data/pi_digits.txt";



function corsHeaders(){

    return {
        "Access-Control-Allow-Origin":"*",
        "Access-Control-Allow-Methods":"GET, POST, OPTIONS",
        "Access-Control-Allow-Headers":"Content-Type"
    };

}



export default {

    async fetch(request, env){

        const url = new URL(request.url);



        if(request.method === "OPTIONS"){

            return new Response(null,{
                headers:corsHeaders()
            });

        }



        // Health check
        if(url.pathname === "/api/health"){

            return Response.json(
                {
                    status:"online",
                    service:"PiStream API"
                },
                {
                    headers:corsHeaders()
                }
            );

        }



        // Current digit timer
        if(url.pathname === "/api/current"){

            const seconds = Math.max(
                0,
                Math.floor(
                    (Date.now() - START_TIME.getTime()) / 1000
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



        // Pi digit loader
        if(url.pathname === "/api/pi"){

            const start =
                Number(url.searchParams.get("start")) || 0;


            const length =
                Math.min(
                    Number(url.searchParams.get("length")) || 100,
                    10000
                );


            const response =
                await fetch(PI_URL);


            const digits =
                await response.text();



            return Response.json(
                {
                    start,
                    length,
                    digits:digits.substring(
                        start,
                        start + length
                    )
                },
                {
                    headers:corsHeaders()
                }
            );

        }




        // Visitor heartbeat
        if(url.pathname === "/api/heartbeat"){

    const visitorId =
        url.searchParams.get("id");


    if(!visitorId){

        return Response.json(
            {
                error:"Missing visitor id"
            },
            {
                status:400,
                headers:corsHeaders()
            }
        );

    }



    await env.PISTREAM_STATS.put(
        `online:${visitorId}`,
        Date.now().toString(),
        {
            expirationTtl: ONLINE_TIMEOUT
        }
    );



    let known =
        await env.PISTREAM_STATS.get(
            `visitor:${visitorId}`
        );



    let isNew = false;



    if(!known){

        isNew = true;


        await env.PISTREAM_STATS.put(
            `visitor:${visitorId}`,
            "true"
        );



        let visitors =
            Number(
                await env.PISTREAM_STATS.get("visitors")
            ) || 0;



        visitors++;



        await env.PISTREAM_STATS.put(
            "visitors",
            visitors.toString()
        );

    }



    return Response.json(
        {
            success:true,
            newVisitor:isNew
        },
        {
            headers:corsHeaders()
        }
    );

}



        // Get stats
        if(url.pathname === "/api/stats"){

            const visitors =
                Number(
                    await env.PISTREAM_STATS.get("visitors")
                ) || 0;



            const onlineKeys =
                await env.PISTREAM_STATS.list({
                    prefix:"online:"
                });



            return Response.json(
                {
                    online:onlineKeys.keys.length,
                    visitors
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