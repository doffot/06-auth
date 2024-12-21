
//no funciona por el nombre del archivo
//demostracion


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
    if (!authHeaders) {  
        return new Response('Auth Necesaria', {  
            status: 401,  
            headers: {  
                'WWW-Authenticate': 'Basic realm="Secure Area"',  
            },  
        });  
    }  

    // Extracción del token de autorización  
    const authValue = authHeaders.split(' ').at(-1); // Obtiene el segundo valor después de 'Basic'  
    if (!authValue) {  
        return new Response('Auth Necesaria', {  
            status: 401,  
            headers: {  
                'WWW-Authenticate': 'Basic realm="Secure Area"',  
            },  
        });  
    }  

    // Decodifica el valor y lo separa en usuario y contraseña  
    const decodeValue = atob(authValue).split(':');  
    const [ user, password ] = decodeValue;

    if ( user === 'admin' && password === 'admin' ){
        return next();
    }
    return new Response('Auth Necesaria', {  
        status: 401,  
        headers: {  
            'WWW-Authenticate': 'Basic realm="Secure Area"',  
        },  
    });  
};