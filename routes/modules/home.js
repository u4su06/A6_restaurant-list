// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//載入restaurant model
const Restaurant = require('../../models/restaurant')

// 設定首頁路由
router.get('/', (req, res) => {
  Restaurant.find() // 取出 Restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .sort({ _id: 'desc' }) //排序
    .then(rests => res.render('index', { rests })) // 將資料傳給 index 樣板
    .catch(error => console.error(error)) // 錯誤處理
})

// 匯出路由模組
module.exports = router