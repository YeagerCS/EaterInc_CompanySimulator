import Bank from "../models/bank"

const retrieveBanks = async (req, res) => {
    const bank = await Bank.findAll();
    res.json(bank)
}

const getBankById = async(req, res) => {
    const id = req.params.id;
    const bank = await Bank.findOne({
        where:{
            id: id
        }
    })
    res.json(bank)
}

const grantLoan = async(req, res) => {
    const { bankId, target } = req.body;
}

const transferLoan = async () => {

}

export { retrieveBanks, getBankById }