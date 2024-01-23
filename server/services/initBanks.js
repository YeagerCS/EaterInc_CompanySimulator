import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs"
import Bank from "../models/bank";


export const initBanks = async () => {
    console.log("TheID: " + crypto.randomUUID());
    const bankRows = await Bank.findAll()
    if(bankRows.length === 0){
        const nationalBank = await Bank.create({
            name: "Battle Bus Banking Co.",
            capital: 240 * (10 ** 9),
            interest: 0.02,
            reference: crypto.randomUUID(),
            hq: "The Agency"
        })

        await Bank.create({
            name: "Bank of Tilted Towers",
            capital: 200 * (10 ** 6),
            interest: 0.01,
            reference: crypto.randomUUID(),
            hq: "Tilted Towers",
            BankId: nationalBank.id
        })

        await Bank.create({
            name: "Loot Lake Loans",
            capital: 50 * (10 ** 6),
            interest: 0.01,
            reference: crypto.randomUUID(),
            hq: "Loot Lake"
        })

        await Bank.create({
            name: "Shifty Shafts Savings",
            capital: 30 * (10 ** 6),
            interest: 0.02,
            reference: crypto.randomUUID(),
            hq: "Shifty Shafts",
            BankId: nationalBank.id
        })

        await Bank.create({
            name: "Durr Burger Depository",
            capital: 160 * (10 ** 6),
            interest: 0.02,
            reference: crypto.randomUUID(),
            hq: "Greasy Grove",
            BankId: nationalBank.id
        })

        await Bank.create({
            name: "Bank of Salty",
            capital: 50 * (10 ** 6),
            interest: 0.03,
            reference: crypto.randomUUID(),
            hq: "Salty Springs",
            BankId: nationalBank.id
        })

        await Bank.create({
            name: "Snobby Savings",
            capital: 35 * (10 ** 6),
            interest: 0.02,
            reference: crypto.randomUUID(),
            hq: "Snobby Shores",
            BankId: nationalBank.id
        })

        await Bank.create({
            name: "Pleasant Park Investments",
            capital: 110 * (10 ** 6),
            interest: 0.01,
            reference: crypto.randomUUID(),
            hq: "Pleasant Park",
            BankId: nationalBank.id
        })
    }
}