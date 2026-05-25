const express = require('express');

const router = express.Router();

const Loan = require("../models/loan.model");

//get api
router.get("/loans", async (req, res) => {
    try {
        const loans = await Loan.find().populate("memberId");
        res.json(loans);
    } catch (err) {
        res.status(500).json(err);
    }
});

//loanTotal
router.get("/loans/total", async (req, res) => {
    try {
        const totals = await Loan.aggregate([
            {
                $group: {
                    _id: "$memberId",
                    totalLoan: {
                        $sum: "$amount"
                    }
                }
            },
            {
                $lookup: {
                    from: "members",
                    localField: "_id",
                    foreignField: "_id",
                    as: "member"
                }
            }
        ]);
        res.status(200).json(totals);
    } catch (err) {
        res.status(500).json(err);
    }
});

//activeLoan
router.get("/loans/active-loan", async (req, res) => {
    try {
        const activeLoans = await Loan.aggregate([
            {
                $match: {
                    status: "active"
                }
            },
            {
                $count: "activeLoans"
            }
        ]);
        res.status(201).json(activeLoans);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get one
router.get("/loans/:id", async (req, res) => {
    try {
        const loans = await Loan.findById(req.params.id).populate("memberId");
        res.json(loans);
    } catch (err) {
        res.status(500).json(err);
    }
});

//post api
router.post("/loans", async (req, res) => {
    try {
        const newLoan = new Loan(req.body);
        const saved = await newLoan.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update
router.put("/loans/:id", async (req, res) => {
    try {
        const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedLoan);
    } catch (err) {
        res.status(500).json(err);
    }
});

//delete
router.delete("/loans/:id", async (req, res) => {
    try {
        await Loan.findByIdAndDelete(req.params.id);
        res.json("Loan deleted");
    } catch (err) {
        res.status(500).json.apply(err);
    }
});

module.exports = router;