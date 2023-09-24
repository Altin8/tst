const express = require('express');
const router = express.Router();

const User = require('../models/userModel');

// Add user
router.post('/add', (req, res) => {
  const user = new User({ _id: req.body.data._id,  ...req.body });
  user.save()
    .then(() => res.status(200).json({ 'User': 'User added successfully' }))
    .catch((err) => {
      res.send(err.message);
      res.status(400).send("Unable to save to database, error: " + err.message)
    }
    );
}
);

// Update user
router.post('/update/:id', async (req, res) => {
  console.log("Updating");
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true, useFindAndModify: false });
      if (!user) {
        const user = new User({ _id: req.body.data._id, data: req.body.data });
        user.save()
          .then(() => res.status(200).json({ 'User': 'User added successfully' }))
          .catch((err) => {
            return res.status(400).send("Unable to save to database, error: " + err.message)
          });
      } else {
        console.log(req.body.data)
        Object.assign(user.data, req.body.data);
        user.save()
          .then(() => res.send('Update complete'))
          .catch((err) => res.send("Unable to update the database, error: " + err.message));
      }
});


// Get user
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    return res.send(user);
  } catch (e) {
    console.log(e);
    return res.status(500).send();
  }
});


module.exports = router;
