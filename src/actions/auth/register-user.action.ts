import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { auth } from "@/lib/auth";
import type { BetterAuthError } from 'better-auth';


export const registerUser = defineAction({
    accept: "form",
    input: z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
        remember_me: z.boolean().optional(),
    }),
    handler: async (input, ctx) => {


        const { name, email, password, remember_me } = input;

        // Cookies
        const { cookies } = ctx;

        if (remember_me) {
            cookies.set('email', email, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 365,
                path: '/',
            });
        } else {
            cookies.delete('email', {
                path: "/"
            });
        }

        try {

            // Register user
            const { token } = await auth.api.signUpEmail({
                body: {
                    name: name,
                    email: email,
                    password: password,
                }
            });


            if (!token) {
                return {
                    ok: false,
                    message: "User could not be registered",
                }
            }

            // Establecer la cookie con el token de sesión
            cookies.set('better-auth.session_token', token, {
                httpOnly: true, // No accesible desde JavaScript en el cliente
                secure: false,   // Solo se envía a través de conexiones HTTPS
                maxAge: 60 * 60 * 24 * 7, // Expira en 7 días
                path: '/',
            });

        } catch (error) {

            const betterAuthError = error as BetterAuthError;

            const message = betterAuthError.message;

            throw new Error(message);
        }


        return {
            ok: true,
            message: "User registered successfully",
        }

    }
});