import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Logo() {
    const navigate = useNavigate()

    return (
        <div className='logo'>
            <img src="../assets/images/logo.png" alt="The Eater Inc." onClick={() => navigate("/")}/>
        </div>
    )
}
