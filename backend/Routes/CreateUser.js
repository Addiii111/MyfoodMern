const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')

router.post(
  '/createuser',
  [
    body('email').isEmail(),
    body('name').isLength({ min: 5 }),
    body('password').isLength({ min: 5 }),
  ],
  async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(req.body.password, salt)
    // console.log(securePassword)
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      await User.create({
        name: req.body.name,
        password: securePassword,
        email: req.body.email,
        location: req.body.location,
      }).then(res.json({ success: true }))
    } catch (error) {
      console.log(error)
      res.json({ success: false })
    }
  }
)

module.exports = router
