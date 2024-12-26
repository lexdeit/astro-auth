import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/db/schema"; // your drizzle instance
import { user, account, session, verification } from "@/db/schema";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "sqlite", // "sqlite"
        schema: { user, session, account, verification }, // Pasa las tablas aquí
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: true,
    },
    session: {
        expiresIn: 60 * 60 * 24 * 7, // 7 días
        updateAge: 60 * 60 * 24      // 1 día (la expiración se actualiza cada día)
    },
    emailVerification: {
        sendOnSignUp: true,
        sendVerificationEmail: async ({ user, url, token }, request) => {

            /*AQUI ES DONDE INTEGRARIAMOS LA LOGICA PARA ENVIAR EL CORREO, 
            LA `URL` QUE RECIBIMOS EN ESTA FUNCION ES LA QUE EL USUARIO TENDRA QUE HACER CLICK PARA VALIDAR SU CORREO*/
           console.log(url);
        }
    }
});

export type Auth = typeof auth;