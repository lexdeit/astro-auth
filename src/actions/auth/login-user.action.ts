import { defineAction } from 'astro:actions';
import { z } from 'astro:schema';
import { signIn } from '@/lib/auth-client';

export const loginUser = defineAction({
    accept: "form",
    input: z.object({
        email: z.string().email(),
        password: z.string().min(8),
    }),
    handler: async (input) => {


        const { email, password } = input;


        const { data, error } = await signIn.email({
            email,
            password,
        });

        console.log(data);

        if (error) {
            return {
                ok: false,
                message: error.message,
            }
        }

        return {
            ok: true,
            message: "User logged in successfully",
        }

    }
});