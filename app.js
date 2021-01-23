const express = require('express')  // 載入 express 並建構應用程式伺服器
const exphbs = require('express-handlebars')  // 載入樣板引擎
const bodyParser = require('body-parser') // 引用 body-parser
const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('./models/restaurant') //載入restaurant model


const app = express()

mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true }) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// 設定首頁路由
app.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(rests => res.render('index', { rests })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 新增頁面
app.get('/rests/new', (req, res) => {
  return res.render('new')
})

app.post('/rests', (req, res) => {
  const item = req.body
  return Restaurant.create({
    name: item.name,
    category: item.category,
    phone: item.phone,
    location: item.location,
    description: item.description,
    image: item.img,
    rating: item.rating
  })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// detail 頁面
app.get('/rests/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((rest) => res.render('detail', { rest }))
    .catch(error => console.log(error))
})

// edit 頁面
app.get('/rests/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((rest) => res.render('edit', { rest }))
    .catch(error => console.log(error))
})

app.post('/rests/:id/edit', (req, res) => {
  const id = req.params.id
  const item = req.body
  return Restaurant.findById(id)
    .then(rest => {
      rest.name = item.name
      rest.category = item.category
      rest.phone = item.phone
      rest.location = item.location
      rest.description = item.description
      rest.rating = item.rating
      return rest.save()
    })
    .then(() => res.redirect(`/rests/${id}`))
    .catch(error => console.log(error))
})

// 刪除功能
app.post('/rests/:id/delete', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(rest => rest.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// 搜尋功能
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then(rests => {
      let filterRests = rests.filter(item => {  //根據 keyword 篩選資料
        return item.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { rests: filterRests, keyword }) // 將資料傳給 index 樣板
    })
    .catch(error => console.error(error)) // 錯誤處理
})

// 開啟並監聽伺服器 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})