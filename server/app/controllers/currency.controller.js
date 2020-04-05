const fetch = require('node-fetch')

const round = (num) => Math.round(num * 100) / 100
const getCostByCurrency = (products, cur) =>
  products
    .filter((prod) => prod.currency === cur)
    .reduce((acc, cur) => (acc += cur.price * cur.quantity), 0)

exports.calculate = async (req, res) => {
  const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js')
  if (!response) {
    res.sendStatus(500)
  }
  const json = await response.json()
  const valutes = json.Valute
  const products = req.body.products
  const USDproducts = getCostByCurrency(products, 'USD')
  const EURproducts = getCostByCurrency(products, 'EUR')
  const RUBproducts = getCostByCurrency(products, 'RUB')
  const totalRUB =
    RUBproducts +
    (EURproducts / valutes.EUR.Nominal) * valutes.EUR.Value +
    (USDproducts / valutes.USD.Nominal) * valutes.USD.Value
  const totalEUR = (totalRUB * valutes.EUR.Nominal) / valutes.EUR.Value
  const totalUSD = (totalRUB * valutes.USD.Nominal) / valutes.USD.Value
  res.send({ RUB: round(totalRUB), EUR: round(totalEUR), USD: round(totalUSD) })
}
