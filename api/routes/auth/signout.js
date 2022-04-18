const express = require('express')
const router = express.Router()

router.post('/user/signout', (req, res) => {
  req.session = null
  res.send({ resultCode: '0' })
})

export { router as signoutRouter }
