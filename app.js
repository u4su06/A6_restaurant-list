const express = require('express')  // 載入 express 並建構應用程式伺服器
const exphbs = require('express-handlebars')  // 載入樣板引擎
const bodyParser = require('body-parser') // 引用 body-parser
const mongoose = require('mongoose') // 載入 mongoose
const Restaurant = require('./models/restaurant') //載入restaurant model
const methodOverride = require('method-override') // 載入 method-override
const routes = require('./routes')  // 引用路由器


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
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)

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