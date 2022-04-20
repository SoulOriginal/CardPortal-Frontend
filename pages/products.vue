<template>
  <div>
    <h1>Наши продукты</h1>
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
              Вы выбрали для заказа:
              <strong>{{ selectedItem.name }}</strong>
            </h3>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="cardsLengt"
              solo
              type="number"
              clearable
              placeholder="Введите количество"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            Цена за 1: {{ selectedItem.price }}
            {{ selectedItem.сurrency_sale }}</v-col
          >
          <v-col cols="12">
            Стоимость заказа: {{ calculatedPrice }}
            {{ selectedItem.сurrency_sale }}</v-col
          >
          <v-col cols="12">
            Доступно на балансе:
            <v-chip outlined color="orange"
              >{{ balance }} {{ balance_сurrency }}</v-chip
            ></v-col
          >
        </v-row>
        <v-btn block class="mt-3" @click="hendlerBuy"> Оплатить</v-btn>
      </v-card>
    </v-dialog>
    <v-card class="pa-2" v-if="duble_table">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Поиск..."
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
            >Купить
          </v-btn>
        </template>
        <template v-slot:item.balance="{ item }">
          {{ item.balance }} {{ item.currency_card }}
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
                  product.availability === 0 ? "Отсутствует" : "В наличии"
                }}</v-chip
              >
              <v-chip close-icon="mdi-delete" color="blue" outlined
                >Баланс: <strong class="ml-1">{{ product.balance }}</strong>
              </v-chip>
              <v-chip close-icon="mdi-delete" color="blue" outlined
                >Наличие: {{ product.availability }} шт
              </v-chip>
            </div>
          </div>

          <div class="product__actions">
            <v-btn
              rounded
              color="#FF8C00"
              @click="openModalBuy(product._id)"
              :disabled="product.availability === 0"
              >Заказать за {{ product.price }}
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
          text: "Название карты",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Цена продажи", value: "price" },
        { text: "Количество", value: "availability" },
        { text: "Валюта продажи", value: "сurrency_sale" },
        { text: "Баланс на карте", value: "balance" },
        {
          text: "Действия",
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
  },
  methods: {
    ...mapActions({
      featchCategories: "categories/featchCategories",
      setDubleTable: "categories/setDubleTable",
    }),
    async hendlerBuy() {
      if (this.calculatedPrice > this.balance) {
        return this.$vueOnToast.pop(
          "error",
          "На вашем балансе не хватает средств, пополните баланс"
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
        await this.$vueOnToast.pop("done", "Оплата успешно прошла");
        await this.$store.dispatch("auth/fetchUser");
        await this.featchCategories();
        this.closeDialog();
        this.$router.push({ name: "orders" });
        return;
      }
      if (status == 99) {
        return this.$vueOnToast.pop(
          "error",
          "На вашем балансе не хватает средств, пополните баланс"
        );
      }
      if (status == 991) {
        return this.$vueOnToast.pop("done", "Ошибка Категории");
      }
      if (status == 992) {
        return this.$vueOnToast.pop(
          "error",
          "Измените количество и попробуйте снова"
        );
      }
      if (status == 993) {
        return this.$vueOnToast.pop(
          "error",
          "Измените количество и попробуйте снова"
        );
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
