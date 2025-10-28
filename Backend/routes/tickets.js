const express = require("express");
const router = express.Router();
const ticketmodel = require("../models/ticketModel");
const { isloggedin } = require("../controllers/auth");
const projectModel = require("../models/projectModel");
const ticketModel = require("../models/ticketModel");
const companyModel = require("../models/companyModel");
const usermodel = require("../models/userModel")


router.post("/createticket", isloggedin, async (req, res) => {
    const { name, message, project, priority, ticketType } = req.body;
    console.log(req.body);
    const user = req.user;
    try {
        const ticket = await ticketmodel.create({
            name,
            message,
            project,
            priority,
            status: "Open",
            ticketType,
            reportedBy: user._id,
            history: [
                {
                    change: "Ticket created",
                    changedBy: user._id,
                    date: new Date()
                }
            ]

        })
        const projects = await projectModel.findById(ticket.project);
        projects.tickets.push(ticket._id);
        await projects.save();

        res.status(200).json({ message: "ticket created Successfully", ticket,success : true })
    } catch (err) {
        console.error(err);

    }



})

router.get('/gettickets/byid/:ticketId', isloggedin, async (req, res) => {
    try {


        const ticketId = req.params.ticketId;
        const userId = req.user._id
        console.log(req.params);
        if (ticketId) {

            const ticket = await ticketmodel.findById(ticketId).populate("project").populate("assignedTo").populate("reportedBy").populate({
                path: "history.changedBy",
                model: "user", // make sure this matches your user model name

            })
            console.log(ticket);
            res.status(200).json({ message: "ticket fetch successfully..!", ticket,userId })
        }

    } catch (error) {
        console.error(error);

    }
})

router.get('/gettickets/bypro/:projectId', isloggedin, async (req, res) => {
    const userId = req.user._id

    try {
        const tickets = await ticketModel.find({ project: req.params.projectId }).populate("reportedBy").populate("assignedTo");

        res.status(200).json({ tickets, message: "tickets fetched successfully" ,userId})
    } catch (err) {
        console.error(err);

    }

})

router.get('/gettickets/bycom/:companyId', isloggedin, async (req, res) => {

    const companyid = req.params.companyId;
    const filter = req.query.filter;
    const userId = req.user._id;

    try {
        const company = await companyModel
            .findById(companyid)
            .populate({
                path: "projects", populate: {
                    path: "tickets",
                    populate: [
                        { path: "reportedBy" },
                        { path: "assignedTo" }
                    ]

                }
            }).lean();

        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        let tickets = company.projects.flatMap(project => project.tickets);
        console.log(tickets);

        if (filter === 'user') {
            tickets = tickets.filter(ticket =>
                ticket.assignedTo._id?.toString() === userId.toString()
            );
        }

        res.status(200).json({ tickets, message: "tickets fetched successfully" ,userId})
    } catch (err) {
        console.error(err);

    }
})

router.post("/updateticket", isloggedin, async (req, res) => {
    const { ticketid, assignedTo, status, priority } = req.body;

    if (!ticketid) {
        return res.status(400).json({ error: "Ticket ID is required" });
    }

    const updateFields = {};
    if (assignedTo) updateFields.assignedTo = assignedTo;
    if (status) updateFields.status = status;
    if (priority) updateFields.priority = priority;

    try {
        const updatedTicket = await ticketmodel.findByIdAndUpdate(
            ticketid,
            updateFields,
            { new: true }
        );

        if (assignedTo && assignedTo !== null) {
            await usermodel.findByIdAndUpdate(
                assignedTo,
                { $addToSet: { assignedTickets: ticketid } },
                { new: true }
            );
        }

        if (status) {
            updatedTicket.history.push({
                change: `Ticket status updated to ${status}`,
                changedBy: req.user._id,
                date: new Date()
            });
        }
          if (priority) {
            updatedTicket.history.push({
                change: `Ticket priority updated to ${priority}`,
                changedBy: req.user._id,
                date: new Date()
            });
        }
        const user = usermodel.findById({assignedTo})
        if (user) {
            updatedTicket.history.push({
                change: `Ticket assigned to user ${user.name}`,
                changedBy: req.user._id,
                date: new Date()
            });
        }
        await updatedTicket.save();

        if (!updatedTicket) {
            return res.status(404).json({ error: "Ticket not found" });
        }

        res.status(200).json({
            message: "Ticket updated successfully",
            ticket: updatedTicket,
            success: true
        });
    } catch (err) {
        console.error("Update error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});


module.exports = router
