import { registerUser } from "./auth";
import { loginWithGoogle } from "./auth/login-google.action";
import { loginUser } from "./auth/login.action";
import { logout } from "./auth/logout.action";


export const server ={
// actions

    // auth
    registerUser,
    logout,
    loginUser,
    loginWithGoogle,

};