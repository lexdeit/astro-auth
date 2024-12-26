import { createAuthClient } from "better-auth/client";


// export const authClient = createAuthClient({
//     baseURL: process.env.BETTER_AUTH_URL! // the base url of your auth server
// });

const BETTER_AUTH_URL = "http://localhost:4321";

export const { signIn, signUp, useSession } = createAuthClient({
    baseURL: BETTER_AUTH_URL, // the base url of your auth server

})