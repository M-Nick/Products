<template>
  <div class="busket">
    <a-layout>
      <a-page-header title="Busket"></a-page-header>
      <a-layout-content :style="{ padding: '16px' }">
        <div class="main-content">
          <a-card
            :width="300"
            :title="'Total cost'"
            :style="{ marginBottom: '20px', width: '300px' }"
          >
            <a-button
              @click="calculate()"
              :disabled="!getProductsCount"
              slot="actions"
              >Calculate</a-button
            >
            <div class="total">
              <p
                v-for="(price, index) in getTotalPrice"
                :key="index"
                class="total-price"
              >
                {{ `${price.currency} ${price.price}` }}
              </p>
            </div>
          </a-card>
          <a-card class="card-add">
            <a-button @click="addProduct()" class="button-add"
              >New product</a-button
            >
            <a-button @click="addRandom()">Add random</a-button>
          </a-card>
        </div>
        <a-list :grid="{ gutter: 20, column: 4 }" :dataSource="getProducts">
          <a-list-item slot="renderItem" slot-scope="item, index">
            <a-card :title="item.name">
              <a-button
                @click="deleteProduct(item.id)"
                type="danger"
                slot="extra"
                size="small"
                :ghost="true"
                >delete</a-button
              >
              <p>
                {{ `Price: ${item.price} ${item.currency}` }}
              </p>
              <p>
                <span class="quantity">{{ `Quantity: ${item.quantity}` }}</span>
                <a-button
                  :disabled="item.quantity > 4999"
                  @click="plus(item.id)"
                  size="small"
                  shape="circle"
                  >+</a-button
                >
                <a-button
                  :disabled="item.quantity < 2"
                  @click="minus(item.id)"
                  size="small"
                  shape="circle"
                  >-</a-button
                >
              </p>
              <p>
                {{
                  `Cost: ${Math.round(item.price * item.quantity * 100) / 100}`
                }}
              </p>
            </a-card>
          </a-list-item>
        </a-list>
      </a-layout-content>
      <a-layout-footer></a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Faker from "faker";

export default {
  name: "Busket",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("products", [
      "getProducts",
      "getProductsCount",
      "getCurrencies",
      "getTotalPrice"
    ])
  },
  methods: {
    plus(id) {
      this.$store.dispatch("products/quantityPlus", id);
    },
    minus(id) {
      this.$store.dispatch("products/quantityMinus", id);
    },
    deleteProduct(id) {
      this.$store.dispatch("products/removeProduct", id);
    },
    addProduct() {
      this.$router.push({ name: "AddProduct" });
    },
    addRandom() {
      const product = {
        name: Faker.fake(`{{commerce.product}}`),
        price: Faker.fake(`{{commerce.price}}`),
        quantity: this.random(1, 10),
        currency: this.getCurrencies[
          this.random(0, this.getCurrencies.length - 1)
        ]
      };
      this.$store.dispatch("products/addProduct", product);
    },
    random(min = 0, max = 100) {
      return Math.round(Math.random() * (max - min) + min);
    },
    calculate() {
      this.$store.dispatch("products/calculateCurrencies");
    }
  }
};
</script>

<style scoped lang="scss">
.total {
  position: relative;
  display: flex;
  justify-content: space-between;
  p {
    margin: 10px;
  }
}
.quantity {
  display: inline-block;
  min-width: 100px;
}
.main-content {
  display: flex;
  align-items: flex-start;
}
.card-add {
  width: 160px;
  margin-left: 20px;
}
.button-add {
  margin-bottom: 8px;
}
.total-price {
  text-align: center;
}
</style>