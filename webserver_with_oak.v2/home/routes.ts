import { Router } from "../deps.ts";

const homeRouter = new Router();

/*   ==============
 * Test with curl
 * curl http://localhost:8000
 * curl -X POST http://localhost:8000
 * curl -X PUT http://localhost:8000
 * curl -X DELETE http://localhost:8000
 */

homeRouter.get("/", (ctx) => {
    const content = `Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'`;
    ctx.response.body = {
        content: content,
    };
});

homeRouter.post("/", (ctx) => {
    const content = `Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'`;
    ctx.response.body = {
        content: content,
    };
});

homeRouter.put("/", (ctx) => {
    const content = `Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'`;
    ctx.response.body = {
        content: content,
    };
});

homeRouter.delete("/", (ctx) => {
    const content = `Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'`;
    ctx.response.body = {
        content: content,
    };
});

export { homeRouter };
