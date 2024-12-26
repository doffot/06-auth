


import { defineAction } from "astro:actions";
import { z } from "astro:content";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { firebase } from "../../firebase/config";

export const loginWithGoogle = defineAction({
    accept: 'json',
    input: z.any(),
    handler: async(credentials) =>{

        

        const credential = GoogleAuthProvider.credentialFromResult(credentials);
        
        if (!credential) {
            throw new Error('Google login failed');
        }

       await signInWithCredential(firebase.auth, credential);
        
        return {ok: true};
    },
});