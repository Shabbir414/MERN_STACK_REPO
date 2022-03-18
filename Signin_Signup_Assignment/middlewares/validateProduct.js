// const { validateProduct } = require("../models/Product");
const Techars = require("../models/techars");
module.exports = function(req, res, next) {
    let { error } = Techars.validateProduct(req.body);
    if (error) {
        console.log(error);
        res.status(401).send(error.message);
    }
    next();
};