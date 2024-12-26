// src/middleware/index.ts
import { defineMiddleware } from "astro:middleware";
import { auth } from "@/lib/auth";


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

    const { url, request, locals } = context;
    const { user, session } = await auth.api.getSession({ headers: request.headers }) || {};
    if (user && session) Object.assign(locals, { user, session });

    if (publicRoutes.includes(url.pathname)) {
        return user ? context.redirect("/protected") : next();
    }

    if (privateRoutes.includes(url.pathname)) {
        return user ? next() : context.redirect("/login");
    }

    return next();
});