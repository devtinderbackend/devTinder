//Created helper function to validate our profile data

const validator = require("validator")    // Imported validator library to validate email and password before we need to install npm i validator

const validateSignUpData = (req) => {
    const { firstName, lastName, emailId, password, gender, age } = req.body;
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

// Validate profile data to update

const validateEditProfileData = (req) => {
    const allowedEditFields = ["gender", "about", "photoUrl", "skills", "age"];
    const requestFields = Object.keys(req.body);

    // Ensure only allowed fields are being edited
    const isEditAllowed = requestFields.every((field) => allowedEditFields.includes(field));
    if (!isEditAllowed) {
        console.log("Validation failed: Invalid field(s) in request", requestFields);
        return false;
    }

    // Field-specific validations
    if (req.body.age && (!Number.isInteger(req.body.age) || req.body.age < 0)) {
        console.log("Validation failed: Age must be a positive number");
        return false;
    }

    if (req.body.gender && !["male", "female", "other"].includes(req.body.gender.toLowerCase())) {
        console.log("Validation failed: Invalid gender value");
        return false;
    }

    if (req.body.photoUrl && !validator.isURL(req.body.photoUrl)) {
        console.log("Validation failed: Invalid photo URL");
        return false;
    }

    if (req.body.skills && !Array.isArray(req.body.skills)) {
        console.log("Validation failed: Skills must be an array");
        return false;
    }
    return true;
}

module.exports = { validateSignUpData, validateEditProfileData }