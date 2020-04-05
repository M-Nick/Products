export default {
  async sendCalculate(products) {
    const res = await fetch(
      'http://localhost:3000/api/v1/products/calculate_currency',
      {
        method: 'post',
        body: JSON.stringify({ products }),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )
    return await res.json()
  },
}
