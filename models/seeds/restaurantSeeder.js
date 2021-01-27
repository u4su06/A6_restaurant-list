const Restaurant = require('../restaurant.js') // 載入 restaurant model
const restaurantJSON = require('./restaurant.json') // 載入原始資料

// 載入連線設定
const db = require('../../config/mongoose')

db.once('open', () => {

  const rest = restaurantJSON.results
  for (let i = 0; i < rest.length; i++) {
    Restaurant.create({
      id: rest[i].id,
      name: rest[i].name,
      name_en: rest[i].name_en,
      category: rest[i].category,
      image: rest[i].image,
      location: rest[i].location,
      phone: rest[i].phone,
      google_map: rest[i].google_map,
      rating: rest[i].rating,
      description: rest[i].description,
    })
  }
  console.log('restaurantSeeder done')
})