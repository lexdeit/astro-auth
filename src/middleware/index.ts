// src/middleware/index.ts
import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";
import type { Auth } from "@/lib/auth";


const privateRoutes = [
    "/admin",
    "/admin/*",
    "/protected",
];

const publicRoutes = [
    "/login",
    "/register"
];

export const onRequest = defineMiddleware(async (context, next) => {

    const { url, request } = context;



    if (publicRoutes.includes(url.pathname)) {

        const isUserAuth = await isUserAuthenticated({ request, auth });

        if (isUserAuth.isAuthed) {
            return context.redirect("/protected");
        }

    }

    if (privateRoutes.includes(url.pathname)) {

        const isUserAuth = await isUserAuthenticated({ request, auth });

        if (isUserAuth.isAuthed) {
            return next();
        }
        else {
            return context.redirect("/login");
        }

    } else {
        return next();
    }
});

const isUserAuthenticated = async (
    {
        request,
        auth,
    }: {
        request: Request;
        auth: Auth;
    }) => {

    if (!request.headers) {
        return {
            isAuthed: false,
            message: "No headers found"
        }
    }

    const isAuthed = await auth.api.getSession({ headers: request.headers });

    if (!isAuthed) {
        return {
            isAuthed: false,
            message: "User is not authenticated"
        }
    } else {
        return {
            isAuthed: true,
            message: "User is authenticated"
        }
    }

};