const string = "abcdefghijklmopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ"

const generatePassword = (n = 16) => {
    let pass = ""
    for(let i = 0; i < n; i++){
        pass += string[Math.floor(Math.random() * string.length)]
    }

    return pass;
}

export {generatePassword}