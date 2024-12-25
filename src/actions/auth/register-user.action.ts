import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';

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

        console.log(name, email, password, remember_me);

        if (remember_me) {
            ctx.cookies.set('email', email, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 365,
                path: '/',
            });
        } else {
            ctx.cookies.delete('email', {
                path: "/"
            });
        }



        return {
            ok: true,
            message: "User registered successfully",
        }

    }
});