const express = require('express')  // 載入 express 並建構應用程式伺服器
const exphbs = require('express-handlebars')  // 載入樣板引擎
const bodyParser = require('body-parser') // 引用 body-parser
const Restaurant = require('./models/restaurant') //載入restaurant model
const methodOverride = require('method-override') // 載入 method-override
const routes = require('./routes')  // 引用路由器

require('./config/mongoose') //執行Mongoose 連線設定

const app = express()

// 設定樣板引擎
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting body-parser
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))
// 將 request 導入路由器
app.use(routes)

// 開啟並監聽伺服器 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})