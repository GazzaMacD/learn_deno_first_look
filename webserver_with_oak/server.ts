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

/* Routes  ==============
 * Test with curl on index route
 * curl http://localhost:8000
 * curl -X POST http://localhost:8000
 * curl -X PUT http://localhost:8000
 * curl -X DELETE http://localhost:8000
 */

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

/* Test with curl on index route
 * curl http://localhost:8000/users
 * curl -X DELETE http://localhost:8000/003c168d-09bb-4688-bd4e-4988ddfd6a01
 * curl -X PUT http://localhost:8000/users/003c168d-09bb-4688-bd4e-4988ddfd6a01
 * curl -X DELETE http://localhost:8000/users/003c168d-09bb-4688-bd4e-4988ddfd6a01
 */

router.get("/users", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    `;
});

router.post("/users", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    `;
});

router.put("/users/:userId", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    Update will be made on user with id - ${ctx.params.userId}
    `;
});

router.delete("/users/:userId", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    Delete will be made on user with id - ${ctx.params.userId}
    `;
});

app.use(router.allowedMethods());
app.use(router.routes());

console.info(`Server running on port ${PORT}`);
await app.listen({ port: PORT });
