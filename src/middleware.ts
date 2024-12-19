

import { defineMiddleware } from "astro:middleware";


const privateRoutes = ['/protected'];

export const onRequest = defineMiddleware(async({ url, request }, next) => {
    //  console.log(context.url);

    const authHeaders = request.headers.get('authorization');
     console.log('~onRequest ~ authHeaders:',authHeaders);

    if (privateRoutes.includes(url.pathname)) {
        return new Response('Auth Necesaria', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic real="Secure Area"',
            },
        })
    }

    return next();
});