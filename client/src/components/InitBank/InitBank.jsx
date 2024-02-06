import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GET_banks, POST_bank } from '../../apiroutes/routes';
import { formatCurrency } from '../../services/formatCurrency';
import { useAuth } from '../../contexts/AuthenticationProvider';
import Account from '../../models/Account';
import { useNavigate } from 'react-router-dom';
import BankTable from './BankTable';

export default function InitBank() {
    const [banks, setBanks] = useState([]);
    const [account, setAccount] = useState(new Account())
    const navigate = useNavigate();
    const authContext = useAuth();


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get(GET_banks);
                setBanks(response.data);
    
                if (authContext.jwt) {
                    const _account = await authContext.getAccountByJWT(authContext.jwt);
                    setAccount(_account);
                }
            } catch (err) {
                console.error(err);
            }
        }
    
        fetchData();

    }, [authContext.jwt])

    const handleChooseBank = async (bank) => {
        try{
            const response = await axios.post(POST_bank, { bank: bank, id: account.employee.id })
            navigate("/dashboard")
        } catch(error){
            console.error(error);
        }
    }

    if(authContext.loading){
        return <div>Loading...</div>
    }

    return (
        <div className="init-bank-div">
            <div className='bank-info'>
                <p>Attention! In order to start your employment, you'll need to create a bank account</p>
                <p>Choose one of the following banks.</p>
            </div>
            <BankTable banks={banks && banks} handleChooseBank={handleChooseBank}/>
        </div>
    )
}
