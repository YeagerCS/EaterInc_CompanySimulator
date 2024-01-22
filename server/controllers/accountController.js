import Account from "../models/account"

const retrieveAccounts = async (req, res) => {
    const accounts = await Account.findAll();
    res.json(accounts)
}

const getAccountById = async (req, res) => {
    const {id} = req.body;
    const account = await Account.findAll({where: {
        id: id
    }})
    res.json(account)
}

export {retrieveAccounts, getAccountById}