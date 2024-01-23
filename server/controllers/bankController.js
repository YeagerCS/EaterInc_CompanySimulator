import Bank from "../models/bank"

const retrieveBanks = async (req, res) => {
    const bank = await Bank.findAll();
    res.json(bank)
}

export { retrieveBanks }