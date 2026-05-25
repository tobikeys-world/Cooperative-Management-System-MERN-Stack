const express = require('express');

const router = express.Router();

const Member = require("../models/member.model");

const Contribution = require("../models/contribution.model");

const Loan = require("../models/loan.model");

router.get("/dashboard/summary", async (req, res) => {
    try {
        const totalMembers = await Member.countDocuments();

        const totalContribution = await Contribution.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);
        const totalLoan = await Loan.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$amount"
                    }
                }
            }
        ]);
        const activeLoans = await Loan.countDocuments({
            status: "active"
        });

        res.status(201).json({
            totalMembers, totalContributions: totalContribution[0]?.total || 0, totalLoans: totalLoan[0]?.total || 0, activeLoans
        });
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});


module.exports = router;