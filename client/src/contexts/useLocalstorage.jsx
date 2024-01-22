import { createContext, useContext, useEffect, useState } from "react";

const PREFIX = "Elec33tron-"
const NAME = PREFIX+ "Employees"
const LocalStorageContext = createContext();

export const LocalStorageProvider = ({ children }) => {
    const [employees, setEmployees] = useState(() => {
      const storedEmployees = localStorage.getItem(NAME);
      return storedEmployees ? JSON.parse(storedEmployees) : [];
    });
    const [lsctxReload, setLsctxReload] = useState(false);
  
    useEffect(() => {
        const storedEmployees = localStorage.getItem(NAME);
        if (storedEmployees) setEmployees(JSON.parse(storedEmployees));
        console.log(employees);
    }, [lsctxReload]);
  
    const addEmployee = (employee) => {
        setLsctxReload(!lsctxReload)
        setEmployees((prevEmployees) => {
            const _employees = [...prevEmployees, employee];
            localStorage.setItem(NAME, JSON.stringify(_employees));
            return _employees;
        });
    };
  
    const value = {
      employees,
      setLsctxReload,
      addEmployee,
    };
  
    return (
      <LocalStorageContext.Provider value={value}>
        {children}
      </LocalStorageContext.Provider>
    );
  };
  

export const useLocalstorage = () => {
    const context = useContext(LocalStorageContext)
    if(!context){
        throw new Error("useLocalstorage must be used within the LocalStorageProvider")
    }
    return context;
}