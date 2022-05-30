<template>
  <div>
    <h1>{{ $t("global.history") }}</h1>

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
        v-model="selected"
        :headers="headers"
        :items="historyPayment"
        :search="search"
        :sort-desc="[false, true]"
      >
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
        <template v-slot:item.url="{ item }">
          <v-btn link text :href="item.url" target="_blank">Ссылка</v-btn>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn
            v-if="
              item.status_invoice !== 'canceled' &&
              item.status_invoice !== 'paid'
            "
            @click="featchUpdateById(item.invoice_id)"
            >Обновить</v-btn
          >
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
          text: "Сумма",
          value: "amount_usd",
        },
        { text: this.$t("global.tables.pay"), value: "currency" },
        {
          text: "status",
          filterable: true,
          value: "status",
        },

        { text: "url", value: "url" },
        { text: "status_invoice", value: "status_invoice" },
        { text: this.$t("global.tables.date"), value: "create_date" },
        { text: "actions", value: "actions" },
      ],
    };
  },
  created() {
    this.featchPaymentHistory();
  },
  computed: {
    ...mapState("pay", {
      historyPayment: (state) => state.historyPayment,
    }),
  },
  methods: {
    ...mapActions({
      featchPaymentHistory: "pay/featchPaymentHistory",
      featchUpdateById: "pay/featchUpdateById",
    }),
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
