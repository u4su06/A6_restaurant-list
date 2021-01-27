// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 準備引入路由模組
const home = require('./modules/home')  // 引入 home 模組程式碼
const rests = require('./modules/rests')  // 引入 rests 模組程式碼
const search = require('./modules/search')  // 引入 search 模組程式碼


router.use('/', home) // 將網址結構符合 / 字串的 request 導向 home 模組 
router.use('/rests', rests) // 將網址結構符合 /rests 字串開頭的 request 導向 rests 模組
router.use('/search', search)

// 匯出路由器
module.exports = router