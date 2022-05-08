<template>
  <client-only1>
    <div>
      <v-dialog width="600" v-model="ModalEditIsOpen">
        <v-card class="pa-3">
          <v-row no-gutters>
            <v-col cols="12">
              <h3>{{ $t("global.edit") }}</h3>
              <v-text-field
                v-model="dataModalEdit.custom_name"
                solo-inverted
                autofocus
                :placeholder="$t(`global.forms.new_name`)"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="dataModalEdit.balance"
                solo-inverted
                :placeholder="$t(`global.balance`)"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="dataModalEdit.comment"
                solo-inverted
                outlined
                counter
                hide-details
                name="input-7-4"
                :label="$t(`global.tables.comment`)"
              ></v-textarea>
            </v-col>
            <v-btn
              block
              class="mt-5"
              color="success"
              @click="handleUpdateCurd"
              >{{ $t("global.save") }}</v-btn
            >
          </v-row>
        </v-card>
      </v-dialog>
      <v-dialog width="600" v-model="dataModalInfo">
        <cardDesign :order_info="orders[dataModalInfoDataIndex]" />
      </v-dialog>
      <v-btn fab class="mb-3" @click="setDubleTable(!duble_table)"
        ><v-icon
          >mdi-{{ duble_table ? "table" : "table-multiple" }}</v-icon
        ></v-btn
      >
      <v-row no-gutters>
        <v-col cols="12">
          <div v-if="selected_true.length > 0" class="mt-2">
            <v-btn
              color="accent-4 white--text red"
              small
              @click="handleMultiplay('block')"
              >{{ $t("global.disactive") }}</v-btn
            >
            <v-btn
              color="accent-4 white--text green"
              small
              @click="handleMultiplay('activate')"
              >{{ $t("global.activate") }}</v-btn
            >
            <v-btn
              color="blue accent-4 white--text"
              small
              @click="handleMultiplay('txt')"
              >TXT
            </v-btn>
            <v-btn
              color="orange accent-4 white--text"
              small
              @click="handleMultiplay('csv')"
              >CSV
            </v-btn>
          </div>
        </v-col>
      </v-row>
      <v-card class="pa-2" v-if="sortedDataByDubleTable(true).length > 0">
        <v-card-title>
          <!-- <v-row no-gutters>
            <v-col cols="12">
              <v-text-field
                v-model="search_active"
                append-icon="mdi-magnify"
                label="Поиск..."
                single-line
                hide-details
              ></v-text-field
            ></v-col>
            <v-col cols="12">
              <div v-if="selected_true.length > 0" class="mt-2">
                <v-btn
                  color="accent-4 white--text red"
                  small
                  @click="handleMultiplay('block')"
                  >Заблокировать</v-btn
                >
                <v-btn
                  color="accent-4 white--text green"
                  small
                  @click="handleMultiplay('activate')"
                  >Активировать</v-btn
                >
                <v-btn
                  color="blue accent-4 white--text"
                  small
                  @click="handleMultiplay('txt')"
                  >TXT
                </v-btn>
                <v-btn
                  color="orange accent-4 white--text"
                  small
                  @click="handleMultiplay('csv')"
                  >CSV
                </v-btn>
              </div>
            </v-col>
          </v-row> -->
        </v-card-title>
        <v-data-table
          :headers="headers"
          show-select
          item-key="_id"
          :single-select="false"
          v-model="selected_true"
          :items="sortedDataByDubleTable(true)"
          :search="search_active"
          multi-sort
          :sort-desc="[false, true]"
        >
          <template v-slot:item.actions="{ item, index }">
            <v-btn
              color="accent-4 white--text"
              :color="item.status ? 'red' : 'green'"
              small
              @click="handleActivateCurd(item._id, item.status, index)"
            >
              <v-icon color="white"
                >mdi-{{ !item.status ? "lock" : "lock-open" }}</v-icon
              ></v-btn
            >

            <v-btn
              color="blue accent-4 white--text"
              small
              @click="getInfoGdsAndConfigBtId(index)"
            >
              <v-icon color="white">mdi-information-variant</v-icon></v-btn
            >
            <v-btn
              color="blue accent-4 white--text"
              small
              @click="downloadCsvOrTxt([item._id], 'csv')"
            >
              <v-icon color="white">mdi-file-table-outline</v-icon></v-btn
            >
            <v-btn
              color="blue accent-4 white--text"
              small
              @click="downloadCsvOrTxt([item._id], 'txt')"
            >
              <v-icon color="white">mdi-file-document-outline</v-icon></v-btn
            >
            <v-btn
              color="red accent-4 white--text"
              small
              @click="ModalEditIsOpenToogleTrue(item._id, index)"
              ><v-icon color="white">mdi-pencil</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.balance="{ item }">
            {{ item.balance }} {{ item.currency_card }}
          </template>
          <template v-slot:item.card_end="{ item }">
            <div>{{ item.card_month }}/{{ item.card_year.slice(-2) }}</div>
          </template>
          <template v-slot:item.balance="{ item }">
            <div>{{ item.balance }} {{ item.info_card.currency_card }}</div>
          </template>
          <template v-slot:item.name="{ item }">
            <strong v-if="item.custom_name" class="red--text text--lighten-1">{{
              item.custom_name
            }}</strong>
            <div v-else>{{ item.name }}</div>
          </template>
          <template v-slot:item.comment="{ item }">
            <v-tooltip
              bottom
              color="primary"
              :open-on-hover="false"
              :open-on-click="true"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-chip v-bind="attrs" v-on="on">
                  <v-icon color="blue"
                    >mdi-{{
                      item.comment ? "comment-eye" : "comment-off"
                    }}</v-icon
                  >
                </v-chip>
              </template>
              <span>{{
                item.comment ? item.comment : $t("global.no_comment")
              }}</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
      <v-card
        class="pa-2 mt-7"
        v-if="duble_table && sortedDataByDubleTable(false).length > 0"
      >
        <v-card-title>
          <v-text-field
            v-model="search_active"
            append-icon="mdi-magnify"
            :label="$t('global.search')"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          show-select
          item-key="_id"
          :single-select="false"
          v-model="selected_true"
          :items="sortedDataByDubleTable(false)"
          :search="search_active"
          multi-sort
          :sort-desc="[false, true]"
        >
          <template v-slot:item.actions="{ item, index }">
            <v-btn
              color="accent-4 white--text"
              :color="item.status ? 'red' : 'green'"
              small
              @click="handleActivateCurd(item._id, item.status, index)"
            >
              <v-icon color="white"
                >mdi-{{ !item.status ? "lock" : "lock-open" }}</v-icon
              >
            </v-btn>

            <v-btn
              color="blue accent-4 white--text"
              small
              @click="getInfoGdsAndConfigBtId(index)"
            >
              <v-icon color="white">mdi-information-variant</v-icon></v-btn
            >
            <v-btn
              color="blue accent-4 white--text"
              small
              @click="downloadCsvOrTxt([item._id], 'csv')"
            >
              <v-icon color="white">mdi-file-table-outline</v-icon></v-btn
            >
            <v-btn
              color="blue accent-4 white--text"
              small
              @click="downloadCsvOrTxt([item._id], 'txt')"
            >
              <v-icon color="white">mdi-file-document-outline</v-icon></v-btn
            >
            <v-btn
              color="red accent-4 white--text"
              small
              @click="ModalEditIsOpenToogleTrue(item._id, index)"
              ><v-icon color="white">mdi-pencil</v-icon>
            </v-btn>
          </template>
          <template v-slot:item.card_end="{ item }">
            <div>{{ item.card_month }}/{{ item.card_year.slice(-2) }}</div>
          </template>
          <template v-slot:item.balance="{ item }">
            {{ item.balance }} {{ item.currency_card }}
          </template>
          <template v-slot:item.balance="{ item }">
            <div>{{ item.balance }} {{ item.info_card.currency_card }}</div>
          </template>
          <template v-slot:item.name="{ item }">
            <strong v-if="item.custom_name" class="red--text text--lighten-1">{{
              item.custom_name
            }}</strong>
            <div v-else>{{ item.name }}</div>
          </template>
          <template v-slot:item.card_end="{ item }">
            <div>{{ item.card_month }}/{{ item.card_year.slice(-2) }}}</div>
          </template>
          <template v-slot:item.comment="{ item }">
            <v-tooltip
              bottom
              color="primary"
              :open-on-hover="false"
              :open-on-click="true"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-chip v-bind="attrs" v-on="on">
                  <v-icon color="blue"
                    >mdi-{{
                      item.comment ? "comment-eye" : "comment-off"
                    }}</v-icon
                  >
                </v-chip>
              </template>
              <span>{{
                item.comment ? item.comment : $t("global.no_comment")
              }}</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </div>
    <div ref="cursorl" class="cursor cursor--large"></div>
    <div class="cursor cursor--small"></div>
  </client-only1>
</template>

<script>
import { saveAs } from "file-saver";
import { mapGetters, mapActions, mapState, mapMutations } from "vuex";
import cardDesign from "@/components/greatCardDesign";
export default {
  layout: "profile",
  components: {
    cardDesign,
  },
  data() {
    return {
      dataModalEdit: {},
      dataModalInfo: false,
      selected_true: [],
      selected_false: [],
      dataModalInfoDataIndex: null,
      ModalEditIsOpen: false,
      search: null,
      headers: [
        {
          text: this.$t("global.tables.card_name"),
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: this.$t("global.tables.type"), value: "type" },
        {
          text: this.$t("global.tables.order_number"),
          value: "order_number",
        },
        { text: this.$t("global.tables.balance_simple"), value: "balance" },
        { text: this.$t("global.tables.curd_number"), value: "card_number" },
        { text: this.$t("global.tables.end_date"), value: "card_end" },
        { text: this.$t("global.tables.cvv"), value: "card_cvv" },
        { text: this.$t("global.tables.comment"), value: "comment" },

        {
          text: this.$t("global.tables.actions"),
          value: "actions",
          filterable: false,
          align: "center",
        },
      ],
    };
  },
  computed: {
    getTablelang() {
      const langStr = this.locale;
      return `${this.locale}-${langStr.toUpperCase()}`;
    },
    filterOnStatus(status_prop) {
      if (!this.duble_table) return this.orders;
      return this.orders.filter((value) => value.status === status_prop);
    },
    ...mapState("order", {
      loading: (state) => state.loading,
      orders: (state) => state.orders,
      duble_table: (state) => state.duble_table,
    }),
    ...mapState("lang", {
      locale: (state) => state.locale,
    }),
    ...mapGetters({
      sortedDataByDubleTable: "order/sortedDataByDubleTable",
    }),
  },
  methods: {
    ...mapActions({
      featchOrders: "order/featchOrders",
      updateOrder: "order/updateOrder",
      updateOrderStatus: "order/updateOrderStatus",
      setDubleTable: "order/setDubleTable",
    }),
    ...mapMutations({
      SET_ORDERS: "order/SET_ORDERS",
    }),
    async handleUpdateCurd() {
      await this.updateOrder(this.dataModalEdit);
    },
    async handleActivateCurd(id, active) {
      await this.updateOrderStatus({
        gds_id: id,
        active: !active,
      });
    },
    getInfoGdsAndConfigBtId(index) {
      this.dataModalInfo = true;
      this.dataModalInfoDataIndex = index;
    },
    async handleMultiplay(userAction) {
      if (this.selected_true.length === 0) return;
      const selectedIds = this.selected_true.map((item) => item._id);
      switch (userAction) {
        case "block":
          await this.$axios.put("/global/orders/multi/status", {
            status: false,
            selected_ids: selectedIds,
          });
          await this.featchOrders();
          break;
        case "activate":
          await this.$axios.put("/global/orders/multi/status", {
            status: true,
            selected_ids: selectedIds,
          });
          await this.featchOrders();
          break;
      }
      if (userAction == "txt" || userAction == "csv") {
        this.downloadCsvOrTxt(selectedIds, userAction);
      }
      this.selected_true = [];
    },
    async downloadCsvOrTxt(ids, format) {
      const { data } = await this.$axios.post("/global/orders/multi/download", {
        selected_ids: ids,
      });
      let txtContent = data.rows.map((e) => e.join(";")).join("\n");
      const type =
        format === "txt"
          ? "text/plain;charset=utf-8"
          : "text/csv;charset=utf-8";
      var blob = new Blob([txtContent], {
        type,
      });
      saveAs(blob, `CardPortal-${this.$moment().format("L hh:mm")}.${format}`);
    },
    ModalEditIsOpenToogleTrue(id) {
      this.ModalEditIsOpen = true;
      const filtredData = [...this.orders]
        .filter((val) => val._id === id)
        .map((val) => {
          console.log(val);
          // if (!val?.comment) val.comment = null;
          // if (!val?.custom_name) val.custom_name = null;
          return {
            gds_id: val._id,
            balance: val.balance || 0,
            comment: val.comment || null,
            custom_name: val.custom_name || null,
          };
        })[0];
      this.dataModalEdit = filtredData;
    },
  },
  async mounted() {
    await this.featchOrders();
  },
};
</script>

<style>
.v-dialog {
  margin: 0 !important;
}
</style>
