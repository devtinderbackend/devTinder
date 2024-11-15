//Created helper function to validate our profile data

const validator = require("validator")    // Imported validator library to validate email and password before we need to install npm i validator
const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password } = req.body;
    if (!firstName || !lastName) {
        throw new Error("Please enter valid Name!")
    }
    else if (!validator.isEmail(emailId)) {
        throw new Error("Invalid user!")
    }
    else if (!validator.isStrongPassword(password)) {
        throw new Error("Invalid user!")
    }
}
module.exports = { validateSignUpData }