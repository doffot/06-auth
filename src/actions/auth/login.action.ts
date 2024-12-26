

import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { signInWithEmailAndPassword, type AuthError } from "firebase/auth";
import { firebase } from "../../firebase/config";


export const loginUser = defineAction({
    accept: 'form',
    input: z.object({
        email: z.string().email(),
        password: z.string().min(6),
        remember_me: z.boolean().optional(),
    }),

    handler: async ({email, password, remember_me}, {cookies}) => {

         // Manejar cookies  
         if (remember_me) {
            cookies.set('email', email, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365), // 1 año
                path: '/',

            });
        } else {

            cookies.delete('email', {
                path: '/',
            });
        }

        try {

            const user = await signInWithEmailAndPassword(firebase.auth, email, password)

            return {
                uid: user.user.uid,
                email: user.user.email
               }
        } catch (error) {
            const firebaseError = error as AuthError;
            
                        if (firebaseError.code === 'auth/email-already-in-use') {
                            throw new Error('El correo ya está en uso');
                        }
            
                        console.log(error);
                        throw new Error('no se pudo iniciar sesion');
        }
    },
});