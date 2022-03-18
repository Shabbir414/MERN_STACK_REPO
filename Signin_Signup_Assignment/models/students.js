const Joi = require("joi");
const mongoose = require("mongoose");

var schema = mongoose.Schema({
    name: String,
    rolNumber: Number,
    email: { type: String, lowercase: true },
    password: String,
});

schema.statics.validateStudents = (data) => {
    let joiSchema = Joi.object({
        name: Joi.string().min(3).max(50),
        password: Joi.string().min(3).max(50),
        email: Joi.string().email(),
        rolNumber: Joi.number(),
    });
    return joiSchema.validate(data, { abortEarly: false });
};

const Students = mongoose.model("Students", schema);

module.exports = Students;