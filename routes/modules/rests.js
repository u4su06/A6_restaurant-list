// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
//載入restaurant model
const Restaurant = require('../../models/restaurant')

// 新增頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', (req, res) => {
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
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((rest) => res.render('detail', { rest }))
    .catch(error => console.log(error))
})

// edit 頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then((rest) => res.render('edit', { rest }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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
router.delete('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .then(rest => rest.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router