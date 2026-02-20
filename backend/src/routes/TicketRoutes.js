const express = require("express");
const router = express.Router();

const TicketController = require("../controllers/TicketController");
const { authenticate, authorize } = require("../middlewares");

// Routes publiques
router.get("/types", TicketController.getTicketTypes);
router.post("/", TicketController.createTicket);

// Routes admin uniquement
router.get("/", authenticate, authorize("super_admin", "admin"), TicketController.getAllTickets);
router.patch("/scan", authenticate, authorize("super_admin", "admin"), TicketController.scanTicket);
router.delete("/:id", authenticate, authorize("super_admin", "admin"), TicketController.deleteTicket);

module.exports = router;
