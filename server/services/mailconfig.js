import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "lejsdev@gmail.com",
        pass: ""
    }
})

export {transporter}
