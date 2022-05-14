<template>
  <div>
    <h1>{{ $t("global.this_products") }}</h1>
    <v-btn fab small @click="setDubleTable(!duble_table)" class="ma-3"
      ><v-icon>{{
        duble_table ? `mdi-format-list-bulleted-type` : `mdi-table-large`
      }}</v-icon></v-btn
    >
    <v-dialog width="600" v-model="ModalBuyIsOpen">
      <v-card class="pa-3">
        <v-row no-gutters>
          <!-- <v-col cols="12">
            <v-text-field placeholder="Введите количество"></v-text-field>
          </v-col> -->
          <v-col cols="12">
            <h3 class="text-center">
              {{ $t("global.user_select_to_order") }}
              <strong>{{ selectedItem.name }}</strong>
            </h3>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="cardsLengt"
              solo
              type="number"
              min="1"
              pattern="^[0-9]"
              step="1"
              max="300"
              clearable
              :placeholder="$t(`global.forms.typeing_counters`)"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            {{ $t("global.tables.price") }}: {{ selectedItem.price }}
            {{ selectedItem.сurrency_sale }}</v-col
          >
          <v-col cols="12" class="mt-2">
            {{ $t("global.order_orice") }}: {{ calculatedPrice }}
            {{ selectedItem.сurrency_sale }}</v-col
          >
          <v-col cols="12" class="mt-2">
            {{ $t("global.balance_aliviable") }}:
            <v-chip outlined color="orange"
              >{{ balance }} {{ balance_сurrency }}</v-chip
            ></v-col
          >
          <v-col cols="12" class="mt-2">
            {{ $t("global.balance_after_buy") }}:
            <v-chip outlined color="blue"
              >{{ calculatedPriceAfterBuy }} {{ balance_сurrency }}</v-chip
            ></v-col
          >
        </v-row>
        <v-btn block class="mt-3" @click="hendlerBuy">
          {{ $t("global.pay") }}</v-btn
        >
      </v-card>
    </v-dialog>
    <v-card class="pa-2" v-if="duble_table">
      {{ $t("global.tables.price") }}
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t(`global.search`)"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="categories"
        :search="search"
        multi-sort
        :sort-desc="[false, true]"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            :disabled="item.availability === 0"
            color="red accent-4 white--text"
            small
            @click="openModalBuy(item._id)"
            >{{ $t("global.buy") }}
          </v-btn>
        </template>
        <template v-slot:item.balance="{ item }">
          {{ item.balance }} {{ item.currency_card }}
        </template>
        <template v-slot:item.price="{ item }">
          {{ item.price }} {{ item.сurrency_sale }}
        </template>
      </v-data-table>
    </v-card>
    <div v-else>
      <v-card
        v-for="(product, index) in categories"
        :key="index"
        class="pa-4 mt-3 product rounded-lg"
        elevation="2"
      >
        <v-img
          class="product--img"
          max-height="150"
          max-width="140"
          contain
          src="https://static.qiwi.com/img/qiwi_com/cards/virtual/list.png"
          lazy-src="https://static.qiwi.com/img/qiwi_com/cards/virtual/list.png"
        ></v-img>
        <div class="ml-6 product__body">
          <div class="product__body--text">
            <h2>{{ product.name }}</h2>
            <div class="product__body--chips">
              <v-chip
                close-icon="mdi-delete"
                :color="product.availability === 0 ? `red` : `blue`"
                :outlined="product.availability === 0 ? true : false"
                >{{
                  product.availability === 0
                    ? $t("global.product_availability_false")
                    : $t("global.product_availability_true")
                }}</v-chip
              >
              <v-chip close-icon="mdi-delete" color="blue" outlined
                >{{ $t("global.balance") }}:
                <strong class="ml-1"
                  >{{ product.balance }} {{ product.currency_card }}</strong
                >
              </v-chip>
              <v-chip close-icon="mdi-delete" color="blue" outlined
                >{{ $t("global.availability") }}: {{ product.availability }}
              </v-chip>
            </div>
          </div>

          <div class="product__actions">
            <v-btn
              rounded
              color="#FF8C00"
              @click="openModalBuy(product._id)"
              :disabled="product.availability === 0"
              >{{ $t("global.buy_for") }} {{ product.price }}
              {{ product.сurrency_sale }}</v-btn
            >
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  layout: "profile",
  data() {
    return {
      search: null,
      cardsLengt: 0,
      ModalBuyIsOpen: false,
      selectedItem: {},
      headers: [
        {
          text: this.$t("global.tables.card_name"),
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: this.$t("global.tables.price"), value: "price" },
        { text: this.$t("global.tables.availability"), value: "availability" },
        { text: this.$t("global.tables.balance"), value: "balance" },
        {
          text: this.$t("global.tables.actions"),
          value: "actions",
          filterable: false,
          align: "center",
        },
      ],
    };
  },
  dialog(ModalBuyIsOpen) {
    if (newVal === false) {
      this.closeDialog();
    }
  },
  // async fetch() {
  //   const { data } = await this.$axios.get("/profile/admin/conf");

  //   // this.categories.push(data);
  //   this.categories = data;
  // },
  created() {
    this.featchCategories();
  },
  computed: {
    ...mapState("categories", {
      categories: (state) => state.categories,
      duble_table: (state) => state.duble_table,
    }),
    ...mapGetters({
      balance: "auth/balance",
      balance_сurrency: "auth/balance_сurrency",
    }),
    calculatedPrice() {
      if (!parseInt(this.cardsLengt)) return 0;
      return parseInt(this.cardsLengt) * parseInt(this.selectedItem.price);
    },
    calculatedPriceAfterBuy() {
      if (!parseInt(this.balance)) return 0;
      return parseInt(this.balance) - parseInt(this.calculatedPrice);
    },
  },
  methods: {
    ...mapActions({
      featchCategories: "categories/featchCategories",
      setDubleTable: "categories/setDubleTable",
    }),
    isInteger(num) {
      return (num ^ 0) === num;
    },
    async hendlerBuy() {
      if (!this.isInteger(parseFloat(this.cardsLengt))) {
        return this.$vueOnToast.pop(
          "error",
          this.$t("global.paymant.length_float")
        );
      }
      this.cardsLengt = parseInt(this.cardsLengt);
      if (this.calculatedPrice > this.balance) {
        return this.$vueOnToast.pop(
          "error",
          this.$t("global.paymant.user_balance")
        );
      }

      if (this.cardsLengt > this.selectedItem.availability) {
        return this.$vueOnToast.pop(
          "error",
          this.$t("global.paymant.order_length")
        );
      }

      console.log(this.selectedItem);
      const { data } = await this.$axios.post("/profile/user/buy", {
        buy_price: this.calculatedPrice,
        buy_сurrency: this.selectedItem.сurrency_sale,
        // card_balance: this.selectedItem.balance,
        currency_card: this.selectedItem.сurrency_sale,
        item_id: this.selectedItem._id,
        amount: this.cardsLengt,
      });
      const { status } = data;
      if (status == 200) {
        await this.$vueOnToast.pop("done", this.$t("global.paymant.pay_ok"));
        await this.$store.dispatch("auth/fetchUser");
        await this.featchCategories();
        this.closeDialog();
        this.$router.push({ name: "orders" });
        return;
      }
      if (status == 99) {
        return this.$vueOnToast.pop(
          "error",
          this.$t("global.paymant.user_balance")
        );
      }
      if (status == 991) {
        return this.$vueOnToast.pop("done", this.$t("global.paymant.category"));
      }
      if (status == 992) {
        return this.$vueOnToast.pop("error", this.$t("global.paymant.length"));
      }
      if (status == 993) {
        return this.$vueOnToast.pop("error", this.$t("global.paymant.length"));
      }
    },
    openModalBuy(id) {
      this.selectedItem = this.categories.filter((val) => val._id === id)[0];
      this.ModalBuyIsOpen = true;
    },
    closeDialog() {
      this.ModalBuyIsOpen = false;
      this.selectedItem = {};
      this.cardsLengt = 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.product {
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
  &__body {
    display: flex;
    flex-direction: row;
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      &--chips {
        display: flex;
        flex-direction: column;
        * {
          margin-top: 5px;
          margin-bottom: 5px;
        }
      }
    }
    width: -webkit-fill-available;
    justify-content: space-between;
    &--text {
      @media (max-width: 768px) {
        align-items: center;
      }
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: space-around;
    }
  }
  &__actions {
    display: flex;
    align-items: center;
  }
}
</style>
