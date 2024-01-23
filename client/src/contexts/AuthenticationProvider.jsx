import {  createContext, useContext, useEffect, useState } from "react";
import { GET_verifyjwt, POST_login } from "../apiroutes/routes";
import axios from "axios";
import Account from "../models/Account.ts";

const AuthenticationContext = createContext()
export const LS_PREFIX = "THEMPLOYEE_MANGER-"

export default function AuthenticationProvider ({ children }) {
    const [jwt, setJwt] = useState("")
    const [authctxReload, setAuthctxReload] = useState(false)

    useEffect(() => {
        const storedJwt = localStorage.getItem(LS_PREFIX + "jwt")
        if(storedJwt) {
            setJwt(storedJwt);
        }
    }, [authctxReload])

    const handleLogin = async (employeeNr, password) => {
        try{
            const response = await axios.post(POST_login, {employeeNr: employeeNr, password: password})
            setJwt(response.data.token)
            localStorage.setItem(LS_PREFIX + "jwt", response.data.token);
            return response.data.firstInit;
        } catch(err){
            console.error(err);
        }
    }

    const getAccountByJWT = async (jwt) => {
        try{
            const response = await axios.post(GET_verifyjwt, { token: jwt })
            const account = new Account(response.data.employee, response.data.employeeNr, jwt);
            return account;
        } catch(err){
            console.error(err);
        }
    }

    const value = {
        jwt, handleLogin, getAccountByJWT, authctxReload, setAuthctxReload
    }

    return <AuthenticationContext.Provider value={value}>{children}</AuthenticationContext.Provider>
}

export const useAuth = () => {
    const context = useContext(AuthenticationContext)
    if(!context){
        throw new Error("useAuth must be used within the AuthenticationProvider")
    }
    return context;
}