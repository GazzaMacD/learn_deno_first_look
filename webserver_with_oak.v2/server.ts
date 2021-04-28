import { Application, Router } from "./deps.ts";

import { userRouter } from "./users/routes.ts";
import { homeRouter } from "./home/routes.ts";

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

/* Routes  ============== */
app.use(homeRouter.allowedMethods());
app.use(homeRouter.routes());
app.use(userRouter.allowedMethods());
app.use(userRouter.routes());

console.info(`Server running on port ${PORT}`);
await app.listen({ port: PORT });
