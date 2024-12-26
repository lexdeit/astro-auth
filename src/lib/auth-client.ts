import { createAuthClient } from "better-auth/client";


// export const authClient = createAuthClient({
//     baseURL: process.env.BETTER_AUTH_URL! // the base url of your auth server
// });

export const { signIn, signUp, useSession } = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL! // the base url of your auth server
})