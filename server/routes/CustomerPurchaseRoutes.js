const express = require('express');
const router = express.Router();
const CustomerPurchase = require('../models/CustomerPurchase'); // Import your model

//Create a new purchase
router.post('/purchases', async (req, res) => {
  try {
    const { userID, totalAmount, paymentStatus, shippingAddress } = req.body; 

    const newPurchase = new CustomerPurchase({ 
      userID, 
      totalAmount, 
      paymentStatus, 
      shippingAddress 
    });

    const savedPurchase = await newPurchase.save(); 

    res.status(201).json(savedPurchase); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating purchase' });
  }
});

//Retrieve all purchases
router.get('/purchases', async (req, res) => {
  try {
    const purchases = await CustomerPurchase.find(); 
    res.json(purchases); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching purchases' });
  }
});

//Get a single purchase by ID
router.get('/purchases/:id', async (req, res) => {
  try {
    const purchase = await CustomerPurchase.findById(req.params.id); 

    if (!purchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.json(purchase); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching purchase' });
  }
});

//Update a purchase by ID
router.put('/purchases/:id', async (req, res) => {
  try {
    const { userID, totalAmount, paymentStatus, shippingAddress, orderStatus } = req.body;

    const updatedPurchase = await CustomerPurchase.findByIdAndUpdate(
      req.params.id, 
      { 
        userID, 
        totalAmount, 
        paymentStatus, 
        shippingAddress, 
        orderStatus 
      }, 
      { new: true } // Return the updated document
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.json(updatedPurchase); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating purchase' });
  }
});

//Delete a purchase by ID
router.delete('/purchases/:id', async (req, res) => {
  try {
    const deletedPurchase = await CustomerPurchase.findByIdAndDelete(req.params.id); 

    if (!deletedPurchase) {
      return res.status(404).json({ message: 'Purchase not found' });
    }

    res.json({ message: 'Purchase deleted successfully' }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting purchase' });
  }
});

module.exports = router;