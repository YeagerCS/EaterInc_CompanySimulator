import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GET_banks, POST_bank } from '../../apiroutes/routes';
import { formatCurrency } from '../../services/formatCurrency';
import { useAuth } from '../../contexts/AuthenticationProvider';
import Account from '../../models/Account';

export default function InitBank() {
    const [banks, setBanks] = useState([]);
    const [account, setAccount] = useState(new Account())

    const authContext = useAuth();


    useEffect(() => {
        async function fetchBanks(){
            try{
                const response = await axios.get(GET_banks);
                setBanks(response.data)
            } catch(err){
                console.error(err);
            }
        }

        async function fetchAccount(){
            try{
                const _account = await authContext.getAccountByJWT(authContext.jwt)
                setAccount(_account)
            } catch(err){
                console.error(err);
            }
        }

        fetchBanks()
        fetchAccount()
    }, [])

    const handleChooseBank = async (bank) => {
        console.log(account);
        try{
            await axios.post(POST_bank, { bank: bank})
        } catch(error){
            console.error(error);
        }
    }

    return (
        <div className="init-bank-div">
            <div className='bank-info'>
                <p>Attention! In order to start your employment, you'll need to create a bank account</p>
                <p>Choose one of the following banks.</p>
            </div>
            <div className="table-container">
                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Capital</th>
                            <th>Interest Rate</th>
                            <th>HQ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {banks && banks.map(bank => {
                            return(
                                <>
                                    {bank.BankId && 
                                        <tr onClick={() => handleChooseBank(bank)}>
                                            <td>{bank.name}</td>
                                            <td>{formatCurrency(bank.capital)}</td>
                                            <td>{bank.interest * 100}%</td>
                                            <td>{bank.hq}</td>
                                        </tr>
                                    }
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
