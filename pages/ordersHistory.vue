<template>
  <div>
    <h1>История</h1>
    <v-card class="pa-2">
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
        :items="history"
        :search="search"
        multi-sort
        :sort-desc="[false, true]"
      >
        <template v-slot:item.actions="{ item }">
          <v-btn
            :disabled="item.availability === 0"
            color="red accent-4 white--text"
            small
            @click="downloadFile(item._id, 'txt')"
            >TXT
          </v-btn>
          <v-btn
            :disabled="item.availability === 0"
            color="red accent-4 white--text"
            small
            @click="downloadFile(item._id, 'csv')"
            >CSV
          </v-btn>
        </template>
        <template v-slot:item.create_date="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <span v-bind="attrs" v-on="on">{{
                $moment(item.create_date).format("L")
              }}</span>
            </template>
            <span>{{ $moment(item.create_date).format("L hh:mm") }} </span>
          </v-tooltip>
        </template>
        <template v-slot:item.buy_price="{ item }">
          {{ item.buy_price }} {{ item.сurrency_buy }}
        </template>
        <template v-slot:item.card_balance="{ item }">
          {{ item.card_balance }} {{ item.currency_card }}
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import { saveAs } from "file-saver";
import { mapGetters, mapActions, mapState } from "vuex";
export default {
  layout: "profile",
  data() {
    return {
      search: null,
      headers: [
        {
          text: "Название карт",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Количество", value: "amount" },
        { text: "Баланс карт", value: "card_balance" },
        { text: "Стоимость", value: "buy_price" },
        { text: "Оплата", value: "сurrency_buy" },
        { text: "Дата", value: "create_date" },
        {
          text: "Действия",
          value: "actions",
          filterable: false,
          align: "center",
        },
      ],
    };
  },
  created() {
    this.featchOrdersHistory();
  },
  computed: {
    ...mapState("order", {
      history: (state) => state.history,
    }),
  },
  methods: {
    ...mapActions({
      featchOrdersHistory: "order/featchOrdersHistory",
    }),
    async downloadFile(orderHistoryID, filteFormat) {
      const { data } = await this.$axios.get(
        "/profile/user/orders/history/download",
        {
          params: { orderHistoryID },
        }
      );
      let txtContent = data.rows.map((e) => e.join(";")).join("\n");
      const type =
        filteFormat === "txt"
          ? "text/plain;charset=utf-8"
          : "text/csv;charset=utf-8";
      var blob = new Blob([txtContent], {
        type,
      });
      saveAs(
        blob,
        `CardPortal-${this.$moment().format("L hh:mm")}.${filteFormat}`
      );
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
