import { Router, uuidV4 } from "../deps.ts";
import { users } from "./db.ts";

const userRouter = new Router();
/* Test with curl on users route
 * curl http://localhost:8000/users
 * curl -X POST -H "Content-Type:application/json" http://localhost:8000/users -d '{"email":"bob@helloworld.com"}'
 * curl -X PUT http://localhost:8000/users/003c168d-09bb-4688-bd4e-4988ddfd6a01
 * curl -X DELETE http://localhost:8000/users/003c168d-09bb-4688-bd4e-4988ddfd6a01
 */

userRouter.get("/users", (ctx) => {
    ctx.response.body = Array.from(users.values());
});

userRouter.post("/users", async (ctx) => {
    const id = uuidV4.generate();

    if (ctx.request.hasBody) {
        const { value } = ctx.request.body({ type: "json" });
        const { email } = await value;

        users.set(id, {
            id,
            email,
        });
        ctx.response.status = 201;
        ctx.response.body = { msg: `Success`, userId: id };
    } else {
        console.error(`Post request to ${ctx.request.url} had no body`);
        ctx.response.status = 400;
        ctx.response.body = { msg: `Error, bad request` };
    }
});

userRouter.put("/users/:userId", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    Update will be made on user with id - ${ctx.params.userId}
    `;
});

userRouter.delete("/users/:userId", (ctx) => {
    ctx.response.body = `
    Response to ${ctx.request.method} HTTP Method request made to url '${ctx.request.url}'
    Delete will be made on user with id - ${ctx.params.userId}
    `;
});

export { userRouter };
