import {  createContext, useContext, useEffect, useState } from "react";
import { GET_verifyjwt, POST_login } from "../apiroutes/routes";
import axios from "axios";
import Account from "../models/Account.ts";
import { useNavigate } from "react-router-dom";

const AuthenticationContext = createContext()
export const LS_PREFIX = "THEMPLOYEE_MANGER-"

export default function AuthenticationProvider ({ children }) {
    const [jwt, setJwt] = useState("")
    const [authctxReload, setAuthctxReload] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedJwt = localStorage.getItem(LS_PREFIX + "jwt")
        if(storedJwt) {
            setJwt(storedJwt);
        }
        setLoading(false)
    }, [authctxReload])

    const handleLogout = () => {
        localStorage.removeItem(LS_PREFIX + "jwt")
        setJwt("")
    }

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
            console.log(response.data);
            return account;
        } catch(err){
            console.error(err);
        }
    }

    const value = {
        jwt, handleLogin, getAccountByJWT, authctxReload, 
        setAuthctxReload, handleLogout, loading
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