const express = require('express');
const Trip = require('../models/Trip');
const auth = require('../middleware/auth');

const router = express.Router();

// Save a new trip
router.post('/save', auth, async (req, res) => {
  try {
    const { destination, startDate, endDate, budget, interests, itinerary } = req.body;

    const trip = new Trip({
      user: req.userId,
      destination,
      startDate,
      endDate,
      budget,
      interests,
      itinerary
    });

    await trip.save();
    res.status(201).json({ message: 'Trip saved!', trip });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all trips for logged in user
router.get('/mytrips', auth, async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(trips);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a trip
router.delete('/:id', auth, async (req, res) => {
  try {
    await Trip.findByIdAndDelete(req.params.id);
    res.json({ message: 'Trip deleted!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;