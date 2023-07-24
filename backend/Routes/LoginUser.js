const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const JWT_SECRET_KEY = 'HelloImAdityaAFullStackDeveloper'

router.post(
  '/loginuser',
  [body('email').isEmail(), body('password').isLength({ min: 5 })],

  async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }

      const userData = await User.findOne({ email })
      if (!userData) {
        return res
          .status(400)
          .json({ errors: 'Try login with correct credentials' })
      }

      const pwdCompare = await bcrypt.compare(password, userData.password)

      if (!pwdCompare) {
        return res
          .status(400)
          .json({ errors: 'Try login with correct credentials' })
      }

      const data = {
        user: {
          id: userData.id,
        },
      }

      const authToken = jwt.sign(data, JWT_SECRET_KEY)

      return res.json({ success: true, authToken: authToken })
    } catch (error) {
      console.log(error)
      res.json({ success: false })
    }
  }
)

module.exports = router
