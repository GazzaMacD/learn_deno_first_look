import { serve } from "https://deno.land/std@0.95.0/http/server.ts";

const HOSTNAME = "0.0.0.0";
const PORT = 3002;

const SERVER = serve({
    port: PORT,
    hostname: HOSTNAME,
});
console.log(`Server runing on http://${HOSTNAME}:${PORT}`);
for await (const req of SERVER) {
    const params = new URLSearchParams(req.url.substring(1));
    // from url http://0.0.0.0:3002/?name=Bob
    const name = params.get("name");

    req.respond({
        body: `<h1>Hello ${name || "World"}!</h1>`,
    });
}
