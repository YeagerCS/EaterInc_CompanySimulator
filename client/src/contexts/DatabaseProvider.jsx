import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { GET_bankAccount, GET_banks, GET_employees, POST_employees } from "../apiroutes/routes";

const DatabaseContext = createContext();

export const DatabaseProvider = ({ children }) => {
    const [employees, setEmployees] = useState();
    const [dbctxReload, setDbctxReload] = useState(false);
  
    useEffect(() => {
        const fetchEmployees = async () => {
            try{
                const response = await axios.get(GET_employees)
                setEmployees(response.data)
            } catch(err){
                console.error('Error fetching employees:', err);
            }
        }

        fetchEmployees();
    }, [dbctxReload]);
  
    const addEmployee = async(employee) => {
        try{
            const response = await axios.post(POST_employees, employee)
            console.log("Successfully added employee");
            console.log(response);
            
        } catch(err){
            console.log("Error adding employee " + err);
        }
        setDbctxReload(true)
    };

    const getBankAccountById = async (id) => {
        try{
            const response = await axios.post(GET_bankAccount, { id: id })
            return response.data.BankAccount;
        } catch(err){
            console.log(err);
        }
    }

    const getBankById = async(id) => {
        try{
            const response = await axios.get(GET_banks + "/" + id);

            return response.data;
        } catch(err){
            console.log(err);
        }
    }
  
    const value = {
      employees,
      setDbctxReload,
      addEmployee,
      dbctxReload,
      getBankAccountById,
      getBankById
    };
  
    return (
      <DatabaseContext.Provider value={value}>
        {children}
      </DatabaseContext.Provider>
    );
  };
  

export const useEmployees = () => {
    const context = useContext(DatabaseContext)
    if(!context){
        throw new Error("useEmployees must be used within the DatabaseContext")
    }
    return context;
}