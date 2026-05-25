const express = require('express');

const router = express.Router();

const Contribution = require("../models/contribution.model");

//get api
router.get("/contributions", async (req, res) => {
    try {
        const data = await
            Contribution.find().populate("memberId");
        res.json(data);
    } catch (err) {
        res.status(500).json(err);
    }
});


//total
router.get("/contributions/total", async (req, res) => {
    try {
        const totals = await Contribution.aggregate([
            {
                $group: {
                    _id: "$memberId",
                    totalContribution: {
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
        res.json(totals);
    } catch (err) {
        res.status.apply(500).json(err);
    }
});

//get one
router.get("/contributions/:id", async (req, res) => {
    try {
        const contribution = await Contribution.findById(req.params.id).populate("memberId");
        res.json(contribution);
    } catch (err) {
        res.status(500).json(err);
    }
})

//post
router.post("/contributions", async (req, res) => {
    try {
        const newContribution = new Contribution(req.body);
        const saved = await newContribution.save();
        res.status(201).json(saved);
    } catch (err) {
        res.statusCode(400).json(err);
    }
});

//update
router.put("/contributions/:id", async (req, res) => {
    try {
        const updatedContribution = await Contribution.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedContribution);
    } catch (err) { res.status(500).json(err) }
});

//delete
router.delete("/contributions/:id", async (req, res) => {
    try {
        await Contribution.findByIdAndDelete(req.params.id);
        res.json("Contribution deleted");
    } catch (err) {
        res.status(500).json(err);
    }
});
;



module.exports = router;