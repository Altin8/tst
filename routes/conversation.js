const express = require('express');
const Conversation = require('../models/conversation');
const router = express.Router();

// Add conversation
router.post('/addConversations', async (req, res) => {
    const conversation = new Conversation({
        _id: req.body._id,
        clientId: req.body.clientId,
        participants: req.body.participants,
        username: req.body.username,
    });
    try {
        await conversation.save();
        return res.send(conversation);
    } catch (e) {
        return res.send(e);
    }
});

// Get conversation
router.get('/:id', async (req, res) => {
    const conversation = await Conversation.findById(req.params.id);
    try {
        if (!conversation) {
            return res.status(404).send();
        }
        return res.send(conversation);
    } catch (e) {
        return res.status(500).send();
    }
});

// Update conversation
router.post('/update/:id', async (req, res) => {
    try {
        const conversation = await Conversation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
        if (!conversation) {
            return res.status(404).send();
        }
        return res.send(conversation);
    } catch (e) {
        return res.status(400).send(e);
    }
});

// Get conversations for a participant
router.get('/participant/:id', async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: req.params.id
        });
        return res.send(conversations);
    } catch (e) {
        return res.status(500).send();
    }
});

router.delete('/conversationsDelete/:id', async (req, res) => {
  try {
    const conversation = await Conversation.findById(req.params.id);

    if (!conversation) {
      return res.status(404).json({
        message: "Conversation not found",
      });
    }

    await Conversation.deleteOne({ _id: req.params.id });

    res.status(200).json({
      message: "Conversation deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
});

module.exports = router;
