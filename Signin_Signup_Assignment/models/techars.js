// const { number, string } = require("joi");
const Joi = require("joi");
const mongoose = require("mongoose");

var schema = mongoose.Schema({
    name: String,
    email: { type: String, lowercase: true },
    password: String,
});
schema.statics.validateTeachars = (data) => {
    const joischema = Joi.object({
        name: Joi.string().min(3).max(10),
        password: Joi.string().min(1).max(15),
        email: Joi.string().email(),
    });
    return joischema.validate(data, { abortEarly: false });
};

var Techars = mongoose.model("Techars", schema);

module.exports = Techars;