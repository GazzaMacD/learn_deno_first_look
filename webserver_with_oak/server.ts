import { Application } from "https://deno.land/x/oak@v7.3.0/mod.ts";

const PORT = 8000;

const app = new Application();

/* Middleware  ============== */
// Logger
app.use(async (ctx, next) => {
    await next();
    const rt = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

// Timing
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${ms}ms`);
});

/* Responses  ============== */
app.use((ctx) => {
    ctx.response.body = "<h1>Hello World!</h1>";
});

console.info(`Server running on port ${PORT}`);
await app.listen({ port: PORT });
