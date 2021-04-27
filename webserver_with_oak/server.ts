import { Application, Router } from "https://deno.land/x/oak@v7.3.0/mod.ts";

const PORT = 8000;

const app = new Application();
const router = new Router();

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

/* Routes  ============== */
router.get("/", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    `;
});

router.post("/", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    `;
});

router.put("/", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    `;
});

router.delete("/", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    `;
});

app.use(router.allowedMethods());
app.use(router.routes());
console.info(`Server running on port ${PORT}`);
await app.listen({ port: PORT });
