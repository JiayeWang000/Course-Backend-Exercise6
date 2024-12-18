const express = require("express");
const router = express.Router();
const {
    getAllEvents,
    getEventById,
    postEvent,
    putEvent,
    deleteEvent,
} = require("../controllers/eventController");
const validateEvent = require("../middlewares/validateEvent");
const authenticate = require("../middlewares/authenticate");


router.get("/", authenticate([]), getAllEvents);
router.get("/:id", authenticate([]), getEventById);
router.post("/", authenticate(["admin"]), validateEvent(), postEvent);
router.put("/:id",authenticate(["admin"]), validateEvent(true), putEvent);
router.delete("/:id",authenticate(["admin"]), deleteEvent);

module.exports = router;