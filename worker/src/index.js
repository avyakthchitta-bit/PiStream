const START_TIME = new Date("2026-08-01T00:00:00Z");


export default {

    async fetch(request) {

        const url = new URL(request.url);


        // Health check
        if (url.pathname === "/api/health") {

            return Response.json({
                status: "online",
                service: "PiStream API",
                version: "1.0"
            });

        }


        // Current digit calculation
        if (url.pathname === "/api/current") {

            const seconds = Math.max(
                0,
                Math.floor(
                    (Date.now() - START_TIME.getTime()) / 1000
                )
            );


            return Response.json({

                digit: seconds,

                message:
                    `Currently showing digit #${seconds}`

            });

        }


        return Response.json({
            message: "Welcome to PiStream API"
        });

    }

};