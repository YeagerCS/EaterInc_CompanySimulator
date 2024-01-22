import { transporter } from "./mailconfig"

const sendMail = (mailOptions) => {
    transporter.sendMail(mailOptions,  (error, info) => {
        if(error){
            return console.error("Error: " + error.message)
        }
        console.log("Mail sent.");
    })
}

export {sendMail}