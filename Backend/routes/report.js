const express = require("express");
const router = express.Router();
const Member = require("../models/member.model");
const Contribution = require("../models/contribution.model");
const Loan = require("../models/loan.model");

router.get("/", async (req, res) => {
    try {
        //Total members
        const totalMembers = await Member.countDocuments();

        //Total Contributions
        const contributionResult = await Contribution.aggregate([{
            $group: {
                _id: null,
                totalContribution: {
                    $sum: "$amount",
                },
            },
        },]);
        //Total Loan
        const loanResult = await Loan.aggregate([{
            $group: {
                _id: null,
                totalLoan: {
                    $sum: "$amount",
                },
            },
        },]);

        //Active Loans
        const activeLoans = await Loan.countDocuments({
            status: "active",
        });
        res.json({
            totalMembers, totalContribution: contributionResult[0]?.totalContribution || 0, totalLoan: loanResult[0]?.totalLoan || 0, activeLoans
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.get("/summary", async (req, res) => {
    try {
        const members = await Member.find();
        const contributions = await Contribution.find();
        const loans = await Loan.find();
        const report = members.map((member) => {
            const memberContributions = contributions.filter((c) =>
                c.memberId.toString() === member._id.toString());

            const memberLoans = loans.filter((l) =>
                l.memberId.toString() === member._id.toString());
            const activeLoanCount = memberLoans.filter((loan) => loan.status === "active").length;
            return {
                name: member.name,
                totalContribution: memberContributions.reduce((sum, c) => sum + c.amount, 0),
                totalLoan: memberLoans.reduce((sum, l) => sum + l.amount, 0),
                activeLoans: activeLoanCount,
            };
        });
        res.json(report);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});



module.exports = router;