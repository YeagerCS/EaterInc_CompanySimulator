import React, { useEffect, useState } from 'react'
import BankTable from '../InitBank/BankTable'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthenticationProvider';
import { GET_banks } from '../../apiroutes/routes';
import Account from '../../models/Account';
import axios from 'axios';
import Header from '../../Headers/Header';
import LoanForm from './LoanForm';

export default function LoanDashboard() {

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

  return (
    <>
      <Header/>
      <div className="init-bank-div">
        <LoanForm/>
      </div>
    </>
  )
}
