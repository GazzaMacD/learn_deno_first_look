/* Basic Webserver with deno server and serveFile
 * =============================================
 * Can run this file with:
 * $ deno run --allow-net --allow-read=. --watch --unstable app.ts
 * or if you don't want to watch for dev changes then :
 * $ deno run --allow-nt --allow-read=. app.ts
 */
import { serve } from "https://deno.land/std@0.95.0/http/server.ts";
import { serveFile } from "https://deno.land/std@0.95.0/http/file_server.ts";
const HOSTNAME = "0.0.0.0";
const PORT = 3002;

const SERVER = serve({
    port: PORT,
    hostname: HOSTNAME,
});
console.log(`Server runing on http://${HOSTNAME}:${PORT}`);
for await (const req of SERVER) {
    const url: string = req.url;
    switch (url) {
        case "/":
            const homePage = `
                <!DOCTYPE html>
                <html lang="en">
                    <head>
                        <meta charset="UTF-8" />
                        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Home</title>
                    </head>
                    <body>
                        <h1>HomePage</h1>
                    </body>
                </html>
            <html>
            `;
            req.respond({
                status: 200,
                body: homePage,
            });
            break;
        case "/about":
            /* - Will fail if not run with --allow-read or -A flags
               - respond.body can take string or UIntByte array */
            const aboutPage = await Deno.readFile("./pages/about.html");
            req.respond({
                status: 200,
                body: aboutPage,
            });
            break;
        case "/contact":
            /* we can also use serveFile from the standard library 'FileServer' 
            as below */
            const contactPage = await serveFile(req, "./pages/contact.html");
            req.respond(contactPage);
            break;
        default:
            req.respond({
                status: 404,
                body: `<h1>Sorry that's a 404</h1>`,
            });
    }
}
