// JS Strict Mode
"use strict";

const Validator = require('validatorjs');

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]/;

// Tighten password policy
Validator.register('strict', value => passwordRegex.test(value),
    'password must contain at least one uppercase letter, one lowercase letter and one number');

/**
 * Checks if incoming value already exist for unique and non-unique fields in the database
 * e.g email: required|email|exists:Admin,email
 */
Validator.registerAsync('exist', async (value,  attribute, req, passes) => {
    if (!attribute) throw new Error('Specify Requirements i.e fieldName: exist:table,column');
    //split table and column
    let attArr = attribute.split(",");
    if (attArr.length !== 2) throw new Error(`Invalid format for validation rule on ${attribute}`);

    //assign array index 0 and 1 to table and column respectively
    const { 0: table, 1: column } = attArr;

    // Check existence in database
    const Model = require(`../models/${table}`);
    const founded = await Model.findOne({ [column]: value });
       if(founded) {
        passes(false, `The ${column} is already found`);
        return;
    }
    passes();
});


// validator method
const validator = async (body, rules, customMessages, callback) => {
    const validation = new Validator(body, rules, customMessages);
    validation.passes(() => callback(null, true));
    validation.fails(() => callback(validation.errors, false));
};
module.exports = validator;