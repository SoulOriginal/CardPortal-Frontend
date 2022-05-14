<template>
  <div>
    <h1>{{ $t("global.history") }}</h1>
    <v-row no-gutters>
      <v-col cols="12">
        <div v-if="selected.length > 0" class="mt-2">
          <v-btn
            color="blue accent-4 white--text"
            small
            @click="downloadFile(null, 'txt', true)"
            >TXT
          </v-btn>
          <v-btn
            color="orange accent-4 white--text"
            small
            @click="downloadFile(null, 'csv', true)"
            >CSV
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-card class="pa-2">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          :label="$t('global.search')"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        show-select
        item-key="_id"
        :single-select="false"
        v-model="selected"
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
      selected: [],
      headers: [
        {
          text: this.$t("global.tables.order_number"),
          align: "start",
          value: "order_number",
        },
        {
          text: this.$t("global.tables.card_name"),
          filterable: true,
          value: "name",
        },
        { text: this.$t("global.tables.availability"), value: "amount" },
        { text: this.$t("global.tables.balance_cards"), value: "card_balance" },
        { text: this.$t("global.tables.price"), value: "buy_price" },
        { text: this.$t("global.tables.pay"), value: "сurrency_buy" },
        { text: this.$t("global.tables.date"), value: "create_date" },
        {
          text: this.$t("global.tables.actions"),
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
    async downloadFile(orderHistoryID, filteFormat, isMulti) {
      var data;
      if (isMulti) {
        const selectedIds = this.selected.map((item) => item._id);
        data = await this.$axios.post("/global/orders/multi/download/history", {
          orderHistoryIDS: selectedIds,
        });
      }
      if (!isMulti) {
        data = await this.$axios.get("/profile/user/orders/history/download", {
          params: { orderHistoryID },
        });
      }
      data = data.data;
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
