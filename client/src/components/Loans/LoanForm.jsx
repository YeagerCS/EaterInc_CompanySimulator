import React, { useEffect, useState } from 'react'
import { useEmployees } from '../../contexts/DatabaseProvider'
import { LS_PREFIX, useAuth } from '../../contexts/AuthenticationProvider'
import { formatCurrency } from '../../services/formatCurrency'
import axios from 'axios'
import { POST_loans } from '../../apiroutes/routes'
import Modal from '../models/Modal'
import { useNavigate } from 'react-router-dom'

export default function LoanForm() {
    const [bankAccount, setBankAccount] = useState(null)
    const [bank, setBank] = useState(null)
    const [amount, setAmount] = useState("")
    const [showDialog, setShowDialog] = useState([false, ""])
    const employeeContext = useEmployees()
    const authContext = useAuth()
    const navigate = useNavigate()


    useEffect(() => {
      async function fetchData() {
        const storedJwt = localStorage.getItem(LS_PREFIX + "jwt")
        if(!storedJwt){
          navigate("/login")
          return;
        }
  
        const _account = await authContext.getAccountByJWT(authContext.jwt);
        const _bankAccount = await employeeContext.getBankAccountById(_account.employee.id)
        const bank = await employeeContext.getBankById(_bankAccount.BankId);
        setBank(bank)
        setBankAccount(_bankAccount)
      }

      fetchData()
    }, [authContext, employeeContext])

    const handleSubmit = async (e) => {
        try{
            e.preventDefault()
            const response = await axios.post(POST_loans, { bankId: bank.id, target: bankAccount.reference, amount: Number(amount)})
            setAmount("")
            setShowDialog([true, response.data])
        } catch(err){
            console.log(err);
        }
    }

    if(bank){
        return (
            <>
                <Modal isOpen={showDialog[0]} onClose={() => setShowDialog([false, ""])}>
                    <h1>{showDialog[1]}</h1>
                </Modal>
                <div className='form-div' onSubmit={handleSubmit}>
                    <form className='form'>
                        <h1 style={{ fontSize: 30}}>Request Loan</h1>
                        <div className='form-group'>
                            <label htmlFor="bank">Bank</label>
                            <input type="text" name='bank' className='form-input' disabled value={bank.name}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="interest">Loan Interest</label>
                            <input type="text" name='interest' className='form-input' disabled value={bank.interest * 100 + "%"}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="capital">Bank Capital</label>
                            <input type="text" name='capital' className='form-input' disabled value={formatCurrency(bank.capital)}/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor="amount">Amount</label>
                            <input type="text" name='amount' className='form-input' placeholder='ex. 100.00' value={amount} onChange={(e) => setAmount(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <input type="submit" name='button' className='form-input' id='form-button' value="Request"/>
                        </div>
                    </form>
            </div>
            </>
        )
    }

    return (
        <div>Loading...</div>
    )
}
