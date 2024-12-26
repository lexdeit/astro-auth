// src/middleware/index.ts
import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";
import type { Auth } from "@/lib/auth";


const privateRoutes = [
    "/admin",
    "/admin/*",
    "/protected",
];

export const onRequest = defineMiddleware(async (context, next) => {

    console.log("Me ejecute en el nuevo")
    const { url, request } = context;

    if (privateRoutes.includes(url.pathname)) {

        return await isUserAuthenticated({ request, auth, next });
        return next();

    } else {
        return next();
    }
});

const isUserAuthenticated = async (
    {
        request,
        auth,
        next
    }: {
        request: Request;
        auth: Auth;
        next: MiddlewareNext;
    }) => {

    if (!request.headers) {
        return new Response("Unauthorized", {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"'
            }
        });
    }

    const isAuthed = await auth.api.getSession({ headers: request.headers });
    console.log(isAuthed);
    if (!isAuthed) {
        return new Response("Unauthorized", {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"'
            }
        });
    } else {
        return next();
    }

};