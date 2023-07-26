const express = require('express')
const app = express()
const port = 8000
const createUser = require('./Routes/CreateUser.js')
const LoginUser = require('./Routes/LoginUser.js')
const DisplayData = require('./Routes/DisplayData.js')
const OrderData = require('./Routes/OrderData.js')
const myOrderData = require('./Routes/OrderData.js');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

require('./db/conn.js')

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api', createUser)
app.use('/api', LoginUser)
app.use('/api', DisplayData)
app.use('/api', OrderData)
app.use('/api', myOrderData)

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
