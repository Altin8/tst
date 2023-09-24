const express = require('express');
const router = express.Router();

// Add a new message
router.post('/', async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(201).json(savedMessage);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all messages
router.get('/', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:docId', async (req, res) => {
  try {
    const messages = await Message.find({ docId: req.params.docId }).sort({ timestamp: 1 }); 
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
