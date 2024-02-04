import React, { useEffect, useState } from 'react'
import { useEmployees } from '../../contexts/DatabaseProvider'
import { formatCurrency } from '../../services/formatCurrency'
import Modal from '../models/Modal'
import TransactionTable from '../Transactions/TransactionTable'

export default function BankAccountInformation({ account }) {
    const [bankAccount, setBankAccount] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [bank, setBank] = useState(null);
    const employeeContext = useEmployees();

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const openModal = () => {
        setIsModalOpen(true)
    }

    useEffect(() => {
        async function fetchData() {
            if(account.employee){
                const _bankAccount = await employeeContext.getBankAccountById(account.employee.id)
                const bank = await employeeContext.getBankById(_bankAccount.BankId);
                setBank(bank)
                setBankAccount(_bankAccount)
            }
        }

        fetchData()
    }, [account, employeeContext])


    return (
        <div className='form-div'>
            {bankAccount && 
                <form className='form'>
                    <h1>Bank account at {bank.name}</h1>
                    <div className='form-group'>
                        <label htmlFor="reference">Reference Number</label>
                        <input type="text" name='reference' className='form-input' disabled value={bankAccount.reference}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="balance">Account Balance</label>
                        <input type="text" name='balance' className='form-input' disabled value={formatCurrency(bankAccount.balance)}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="interest">Yearly Interest Rate</label>
                        <input type="text" name='interest' className='form-input' disabled value={bank.interest * 100 + "%"}/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor="transactions">Transactions</label>
                        <input type="button" name='transactions' id="transactions" className='form-input' value={"View"} onClick={openModal}/>
                    </div>
                    <Modal isOpen={isModalOpen} onClose={closeModal}>
                        <TransactionTable transactions={bankAccount.transactions}/>
                    </Modal>
                </form>
            }
        </div>
    )
}
