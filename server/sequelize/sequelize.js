import { Sequelize } from "sequelize"

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "firm.db"
})

export default sequelize;