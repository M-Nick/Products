import api from '../../api/api'

const state = {
  products: [],
  currencies: ['RUB', 'EUR', 'USD'],
  totalPrice: [],
}

const getters = {
  getProductsCount(state) {
    return state.products.length
  },
  getNextId(state) {
    if (!state.products.length) {
      return 1
    }
    return Math.max(...state.products.map((prod) => prod.id)) + 1
  },
  getProducts(state) {
    return state.products
  },
  getCurrencies(state) {
    return state.currencies
  },
  getTotalPrice(state) {
    return Object.keys(state.totalPrice).map((currency) => ({
      currency,
      price: state.totalPrice[currency],
    }))
  },
}

const mutations = {
  addProduct(state, product) {
    state.products.push(product)
  },
  removeProduct(state, id) {
    state.products = state.products.filter((product) => product.id !== id)
  },
  changeProduct(state, product) {
    state.products = state.products.map((prod) =>
      prod.id === product.id ? product : ptod,
    )
  },
  changeQuantity(state, [id, num]) {
    const product = state.products.find((product) => product.id === id)
    if (product) {
      product.quantity += num
    }
  },
  setTotalPrice(state, totalPrice) {
    state.totalPrice = totalPrice
  },
  resetTotalPrice(state) {
    state.totalPrice = []
  },
}

const actions = {
  addProduct({ commit, getters }, product) {
    const id = getters.getNextId
    product.id = id
    commit('addProduct', product)
    commit('resetTotalPrice')
  },
  removeProduct({ commit }, productId) {
    commit('removeProduct', productId)
    commit('resetTotalPrice')
  },
  changeProduct({ commit }, product) {
    commit('changeProduct', product)
    commit('resetTotalPrice')
  },
  quantityPlus({ commit }, id) {
    commit('changeQuantity', [id, 1])
    commit('resetTotalPrice')
  },
  quantityMinus({ commit }, id) {
    commit('changeQuantity', [id, -1])
    commit('resetTotalPrice')
  },
  async calculateCurrencies({ commit, getters }) {
    const totalPrice = await api.sendCalculate(getters.getProducts)
    commit('setTotalPrice', totalPrice)
  },
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}
