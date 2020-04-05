<template>
  <a-layout>
    <a-page-header @back="handleBack()" title="Add new product"></a-page-header>
    <a-layout-content>
      <a-form-model
        ref="ruleForm"
        :model="form"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 12 }"
        :rules="rules"
        @submit.prevent="handleSubmit"
      >
        <a-form-model-item prop="name" label="Product name" ref="name">
          <a-input
            v-model="form.name"
            @blur="
              () => {
                $refs.name.onFieldBlur();
              }
            "
          />
        </a-form-model-item>
        <a-form-model-item ref="price" prop="price" label="Product price">
          <a-input-number
            v-model="form.price"
            @blur="() => $refs.price.onFieldBlur()"
            decimalSeparator="."
            :step="0.01"
            :html-type="'number'"
            :type="'number'"
            :min="0.01"
            :max="1000000"
          />
        </a-form-model-item>
        <a-form-model-item
          ref="quantity"
          prop="quantity"
          label="Quantity of products"
        >
          <a-input-number
            v-model="form.quantity"
            @change="() => $refs.quantity.onFieldBlur()"
            :min="1"
            :max="5000"
          />
        </a-form-model-item>
        <a-form-model-item ref="currency" prop="currency" label="Currency">
          <a-select
            placeholder="EUR / USD / RUR"
            v-model="form.currency"
            @blur="() => $refs.currency.onFieldBlur()"
          >
            <a-select-option
              v-for="(cur, index) in getCurrencies"
              :key="index"
              :value="cur"
            >
              {{ cur }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-layout-content>
    <a-layout-footer></a-layout-footer>
  </a-layout>
</template>

<script>
import { mapGetters } from "vuex";
import { validationMixin } from "vuelidate";
import {
  required,
  minLength,
  maxLength,
  between
} from "vuelidate/lib/validators";

export default {
  name: "Products",
  mixins: [validationMixin],
  data() {
    return {
      formLayout: "horizontal",
      form: {
        name: "",
        price: undefined,
        quantity: undefined,
        currency: undefined
      },
      rules: {
        name: [
          {
            required: true,
            message: "Product name is required",
            trigger: "blur"
          },
          {
            min: 3,
            max: 35,
            message: "Length should be 3 to 35",
            trigger: "blur"
          }
        ],
        price: [
          {
            required: true,
            message: "Product price is required",
            trigger: "blur"
          },
          { type: "number" }
        ],
        quantity: [
          {
            required: true,
            message: "Quantity of products is required",
            trigger: "blur"
          },
          { type: "integer" }
        ],
        currency: [
          {
            required: true,
            message: "Select the currency"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("products", ["getCurrencies"])
  },
  methods: {
    handleSubmit(e) {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$store.dispatch(
            "products/addProduct",
            Object.assign({}, this.form)
          );
          this.$refs.ruleForm.resetFields();
          this.handleBack();
        }
      });
    },
    handleBack() {
      this.$router.push({ name: "Busket" });
    }
  }
};
</script>

<style lang="scss">
</style>