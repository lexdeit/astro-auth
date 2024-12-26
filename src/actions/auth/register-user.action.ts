import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { auth } from "@/lib/auth";


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

        return {
            ok: true,
            message: "User registered successfully",
        }

    }
});