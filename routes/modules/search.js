// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//載入restaurant model
const Restaurant = require('../../models/restaurant')
// 載入把 sort 資料留在表單裡的工具包
const selectOption = require('./selectOption')

// 搜尋功能 keyword & 排序功能 sort；使用兩組條件處理資料
router.get('/', (req, res) => {
  const keyword = req.query.keyword
  const sort = req.query.sort
  const option = selectOption(sort)

  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort(sort).collation({ locale: 'zh' }) //排序，支援中文
    .then(rests => {
      let filterRests = rests.filter(item => {  //根據 keyword 篩選資料
        return item.name.toLowerCase().includes(keyword.toLowerCase())
      })
      res.render('index', { rests: filterRests, keyword, option }) // 將資料傳給 index 樣板
    })
    .catch(error => console.error(error)) // 錯誤處理
})

// 匯出路由模組
module.exports = router