var express = require("express");
const Techars = require("../../models/techars");
var router = express.Router();
const bcrypt = require("bcryptjs");
const _ = require("lodash");


router.get("/signup", async(req, res) => {
    try {
        let result = new Techars();
        result.email = req.body.email;
        result.name = req.body.name;
        let salt = await bcrypt.genSalt(10);
        result.password = await bcrypt.hash(req.body.password, salt);
        result = await result.save();
        result = _.pick(result, ["name", "email", "_id"]);
        return res.send(result);
    } catch (err) {
        return res.status(401).send(err.message);
    }
});
router.get("/signin", async(req, res) => {
    try {
        // let result = new User();
        let { email, password } = req.body;

        let result = await Techars.find({ email: req.body.email, password: req.body.password });
        if (!result) {
            return res.status(404).send("User with given email was not found");
        }

        let isValid = await bcrypt.compare(password, result.password);
        if (!isValid) {
            return res.status(404).send("Invalid Password");
        }

        result = _.pick(result, ["name", "email", "_id"]);
        // console.log(await _.omit(result, ["password"]));

        return res.send(result);
    } catch (err) {
        return res.status(401).send(err.message);
    }
});



router.get("/", async function(req, res) {
    try {
        // console.log(req.query);
        let perPage = Number(req.query.perPage);
        let page = Number(req.query.page);

        page = (page - 1) * perPage;
        // console.log(page, perPage);

        let result = await Techars.find(req.body).skip(page).limit(perPage);

        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
    }
});
router.get("/:id", async function(req, res) {
    try {
        let result = await Techars.findById(req.params.id);
        if (!result) {
            res.status(400).send("Data with given ID not found");
        }
        return res.send(result);
    } catch (err) {
        console.log(err);
        // res.status(400).send(err.message);
        return res.status(400).send("The format of id is not correct");
    }
});

router.put("/:id", async function(req, res) {
    try {
        let result = await Techars.findById(req.params.id);
        if (!result) {
            return res.status(400).send("The record with given id was not found");
        }


        result = await Techars.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
    }
});
router.delete("/:id", async function(req, res) {
    try {
        let result = await Techars.findById(req.params.id);
        if (!result) {
            return res.status(400).send("record with given ID not found");
        }
        result = await Techars.findByIdAndDelete(req.params.id);
        return res.send(result);
    } catch (err) {
        console.log(err);
        return res.status(400).send(err.message);
        // res.status(400).send("The format of id is not correct");
    }
});

module.exports = router;