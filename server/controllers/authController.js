import Account from "../models/account"
import bcrypt from "bcrypt"
import {generateToken} from "../services/jwtService";

const login = async (req, res) => {
    const {employeeNr, password} = req.body;
    console.log(req.body);

    const {account, firstInit} = await authenticateUser(employeeNr, password);
    if(account){
        const token = generateToken(account)

        res.json({ token: token, firstInit: firstInit })
    } else{
        res.status(401).json({ error: 'Invalid Credentials' })
    }
}

const authenticateUser = async (nr, password) => {
    const account = await Account.findOne({
        where: {
            employeeNr: nr
        }
    });
    const theValid = await bcrypt.compare(password, account.password);
    if(theValid) {
        const isAccountInitialized = account.initialized;
        if(!isAccountInitialized){
            await account.update({ initialized: true })
            return {account: account, firstInit: true};
        }

        return {account: account, firstInit: false};
    }
    return null;
}

export { login }