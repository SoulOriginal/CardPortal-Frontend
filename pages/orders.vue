<template>
  <client-only>
    <div>
      <v-dialog width="600" v-model="ModalEditIsOpen">
        <v-card class="pa-3">
          <v-row no-gutters>
            <v-col cols="12">
              <h3>Редактирование</h3>
              <v-text-field
                v-model="dataModalEdit.custom_name"
                solo-inverted
                autofocus
                placeholder="Новое название"
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="dataModalEdit.balance"
                solo-inverted
                placeholder="Баланс"
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
                label="Комментарий"
                value="Купил мопса"
              ></v-textarea>
            </v-col>
            <v-btn block class="mt-5" color="success" @click="handleUpdateCurd"
              >Save</v-btn
            >
          </v-row>
        </v-card>
      </v-dialog>
      <v-dialog width="600" v-model="dataModalInfo">
        <v-card class="pa-3" v-if="dataModalInfoDataIndex !== null">
          <span
            >Начальный баланс:{{
              orders[dataModalInfoDataIndex].info_card.balance
            }}</span
          >
          <br />
          <span
            >Начальное название :{{
              orders[dataModalInfoDataIndex].info_card.name
            }}</span
          >
          <br />
          <br />
          <span>Комментарий :{{ orders[dataModalInfoDataIndex].comment }}</span>
        </v-card>
      </v-dialog>
      <v-btn fab class="mb-3" @click="duble_table = !duble_table"
        ><v-icon
          >mdi-{{ duble_table ? "table" : "table-multiple" }}</v-icon
        ></v-btn
      >
      <v-card class="pa-2">
        <v-card-title>
          <v-text-field
            v-model="search_active"
            append-icon="mdi-magnify"
            label="Поиск..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="orders"
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
              >{{ !item.status ? "Активировать" : "Заблокировать" }}</v-btn
            >

            <v-btn
              color="blue accent-4 white--text"
              small
              @click="getInfoGdsAndConfigBtId(index)"
            >
              <v-icon color="white">mdi-information-variant</v-icon></v-btn
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
                <v-chip v-bind="attrs" v-on="on">{{
                  item.comment ? "Да" : "Нет"
                }}</v-chip>
              </template>
              <span>{{
                item.comment ? item.comment : "Вы еще не написали"
              }}</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
      <v-card class="pa-2 mt-7">
        <v-card-title>
          <v-text-field
            v-model="search_active"
            append-icon="mdi-magnify"
            label="Поиск..."
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          :headers="headers"
          :items="filterOnStatus"
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
              >{{ !item.status ? "Активировать" : "Заблокировать" }}</v-btn
            >

            <v-btn
              color="blue accent-4 white--text"
              small
              @click="getInfoGdsAndConfigBtId(index)"
            >
              <v-icon color="white">mdi-information-variant</v-icon></v-btn
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
                <v-chip v-bind="attrs" v-on="on">{{
                  item.comment ? "Да" : "Нет"
                }}</v-chip>
              </template>
              <span>{{
                item.comment ? item.comment : "Вы еще не написали"
              }}</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </div>
  </client-only>
</template>

<script>
export default {
  layout: "profile",
  data() {
    return {
      orders: [],
      duble_table: false,
      dataModalEdit: {},
      dataModalInfo: false,
      dataModalInfoDataIndex: null,
      ModalEditIsOpen: false,
      search: null,
      headers: [
        {
          text: "Название карты",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Баланс", value: "balance" },
        { text: "Коментарий", value: "comment" },
        { text: "CVV", value: "card_cvv" },
        { text: "Номер карты", value: "card_number" },
        { text: "Тип", value: "type" },
        { text: "Валидность", value: "card_cvv" },
        {
          text: "Действия",
          value: "actions",
          filterable: false,
          align: "center",
        },
      ],
    };
  },
  computed: {
    filterOnStatus(status_prop) {
      if (!this.duble_table) return this.orders;
      return this.orders.filter((value) => value.status === status_prop);
    },
  },
  methods: {
    async handleUpdateCurd() {
      await this.$axios.put("/profile/user/orders/edit", {
        ...this.dataModalEdit,
      });
    },
    async handleActivateCurd(id, active) {
      await this.$axios.put("/profile/user/orders/active", {
        gds_id: id,
        active: !active,
      });
    },
    getInfoGdsAndConfigBtId(index) {
      this.dataModalInfo = true;
      this.dataModalInfoDataIndex = index;
    },
    ModalEditIsOpenToogleTrue(id) {
      this.ModalEditIsOpen = true;
      this.dataModalEdit = this.orders
        .filter((val) => val._id === id)
        .map((val) => {
          if (!val.comment) val.comment = null;
          if (!val.custom_name) val.custom_name = null;
          return {
            gds_id: val._id,
            balance: val.balance,
            comment: val.comment,
            custom_name: val.custom_name,
          };
        })[0];
    },
  },
  async mounted() {
    const { data } = await this.$axios.get("/profile/user/orders");
    this.orders = data;
  },
};
</script>

<style></style>
