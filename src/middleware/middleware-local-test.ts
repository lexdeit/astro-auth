//EXAMPLE OF BASIC AUTHENTICATION MIDDLEWARE
import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";


const privateRoutes = [
    "/admin",
    "/admin/*",
    "/protected",
];

export const onRequest = defineMiddleware(async ({ url, request }, next) => {


    const authHeaders = request.headers.get('authorization') ?? "";


    if (privateRoutes.includes(url.pathname)) {
        return checkLocalAuth(authHeaders, next);
    } else {



        return next();
    }
});


const checkLocalAuth = async (authHeaders: string, next: MiddlewareNext) => {


    if (!authHeaders) {
        return new Response("Unauthorized", {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"'
            }
        })
    }

    const [username, password] = atob(authHeaders.split(' ')[1]).split(':');
    console.log(username, password);

    if (username === 'admin' && password === 'admin1') {
        return next();
    }

    return new Response("Unauthorized", {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Secure Area"'
        }
    });

};