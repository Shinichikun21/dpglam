const express = require('express');
const router = express.Router();
const CustomerPurchase = require('../models/customerPurchase');

// Create a new customer purchase
router.post('/customerPurchases', async (req, res) => {
  try {
    const newCustomerPurchase = new CustomerPurchase(req.body);
    const savedPurchase = await newCustomerPurchase.save();
    res.status(201).json(savedPurchase); 
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
});

// Get all customer purchases
router.get('/customerPurchases', async (req, res) => {
  try {
    const customerPurchases = await CustomerPurchase.find();
    res.json(customerPurchases);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

// Get a specific customer purchase by ID
router.get('/customerPurchases/:id', async (req, res) => {
  try {
    const customerPurchase = await CustomerPurchase.findById(req.params.id);
    if (!customerPurchase) {
      return res.status(404).json({ message: 'Customer Purchase not found' });
    }
    res.json(customerPurchase);
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

// Update
router.put('/customerPurchases/:id', async (req, res) => {
  try {
    const updatedPurchase = await CustomerPurchase.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );
    if (!updatedPurchase) {
      return res.status(404).json({ message: 'Customer Purchase not found' });
    }
    res.json(updatedPurchase);
  } catch (error) {
    res.status(400).json({ message: error.message }); 
  }
});

//Delete
router.delete('/customerPurchases/:id', async (req, res) => {
  try {
    const deletedPurchase = await CustomerPurchase.findByIdAndDelete(req.params.id);
    if (!deletedPurchase) {
      return res.status(404).json({ message: 'Customer Purchase not found' });
    }
    res.json({ message: 'Customer Purchase deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message }); 
  }
});

module.exports = router;