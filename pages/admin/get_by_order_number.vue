<template>
  <div>
    <v-text-field
      solo-inverted
      type="number"
      placeholder="Номер заказа"
      v-model="order_number"
    ></v-text-field>
    <v-btn block color="red" @click="getDataByOrder">Поиск</v-btn>
    <div v-if="data.user_conf">
      <h3>User</h3>
      <v-data-table
        :headers="headers_user"
        :items="data.user_conf"
        class="elevation-1"
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
        <template v-slot:item.actions="{ item }">
          <v-btn color="red" @click="openModalById(item._id)">
            <v-icon color="white">mdi-account-edit</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>

    <div v-if="data.info_card">
      <h3>Категория</h3>
      <v-data-table
        :headers="headers_conf"
        :items="data.info_card"
        class="elevation-1"
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
        <template v-slot:item.actions="{ item }">
          <v-btn color="red" @click="openModalById(item._id)">
            <v-icon color="white">mdi-account-edit</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </div>

    <h3>Карта</h3>
    <v-data-table :headers="headers_gds" :items="[data]" class="elevation-1">
      <template v-slot:item.card_data="{ item }">
        <div v-if="item.card_year">
          {{ item.card_month }}/{{ item.card_year.slice(-2) }}
        </div>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      order_number: 0,
      data: [],
      headers_user: [
        {
          text: "Email",
          align: "start",
          sortable: false,
          value: "email",
        },
        { text: "Верефецирован", value: "verified" },
        { text: "Баланс", value: "balance" },
        { text: "Дата создания", value: "create_date" },
      ],
      headers_conf: [
        {
          text: "Название карты",
          align: "start",
          filterable: true,
          value: "name",
        },
        { text: "Цена продажи", value: "price" },
        { text: "Количество", value: "availability" },
        { text: "Валюта на карте", value: "currency_card" },
        { text: "Валюта продажи", value: "сurrency_sale" },
        { text: "Баланс карт", value: "balance" },
      ],
      headers_gds: [
        { text: "Баланс", value: "balance" },
        { text: "C V V", value: "card_cvv" },
        { text: "Номер карты", value: "card_number" },
        { text: "Тип", value: "type" },
        { text: "Валидность", value: "card_data" },
      ],
    };
  },
  methods: {
    async getDataByOrder() {
      const { data } = await this.$axios.get(
        `/profile/admin/order?number=${this.order_number}`
      );
      if (data.length > 0) {
        this.data = data[0];
      } else {
        this.$vueOnToast.pop("error", "Ничего не найдено");
      }
    },
  },
};
</script>

<style></style>
