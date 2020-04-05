module.exports = (app) => {
  const currency = require('../../controllers/currency.controller.js')

  const router = require('express').Router()

  router.post('/calculate_currency', currency.calculate)

  app.use('/api/v1/products', router)
}
