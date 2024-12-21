

import type { MiddlewareNext } from "astro";
import { defineMiddleware } from "astro:middleware";


const privateRoutes = ['/protected'];

export const onRequest = defineMiddleware(async({ url, request }, next) => {
    //  console.log(context.url);

    const authHeaders = request.headers.get('authorization') ?? '';
     console.log('~onRequest ~ authHeaders:',authHeaders);

    if (privateRoutes.includes(url.pathname)) {
        return checkLocalAuth(authHeaders, next);

        if ( authHeaders ){
            return next();
        }

        return new Response('Auth Necesaria', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic real="Secure Area"',
            },
        })
    }

    return next();
});

/* const checkLocalAuth = ( authHeaders: string, netx: MiddlewareNext) =>{
    if ( !authHeaders ){
        return new Response('Auth Necesaria', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic real="Secure Area"',
            },
        });
    }

    const authValue =authHeaders.split(' ').at(-1) ?? 'user:pass';
    const decodeValue = atob(authValue).split(':');
   console.log('cheklocalAuth:', decodeValue);

   return next();
}; */

const checkLocalAuth = (authHeaders: string | null, next: MiddlewareNext) => {  
    
    return next()
};