const mongoose = require('mongoose')
const mongoURI = 'mongodb://127.0.0.1:27017/myfoodmern'

const mongoDB = mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to MongoDB')
    const fetched_data = await mongoose.connection.db
      .collection('food_items')
      .find()
      .toArray()

    const foodCategory = await mongoose.connection.db
      .collection('food_category')
      .find()
      .toArray()

    global.food_items = fetched_data
    global.food_cat = foodCategory
    // console.log(global.food_items)
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
  })
