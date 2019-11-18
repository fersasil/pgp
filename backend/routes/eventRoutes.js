const express = require('express');
const sqlinjection = require('sql-injection');

const eventController = require("../controllers/eventController");

// Management Events route
router.get('/gestao-evento', eventController.managementEvents);
// All events route
router.get('/eventos', eventController.getAllEvents);
// Search Event by Title
router.get('/search=?', eventController.getEventByTitle);
// Get selected event
router.get('/evento', eventController.getEventById);
// Create a new event
router.post('/cadastrar-evento', eventController.createEvent);

module.exports = router;