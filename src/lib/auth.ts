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
    }
});

export type Auth = typeof auth;