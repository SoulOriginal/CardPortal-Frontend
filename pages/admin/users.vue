<template>
  <div>
    <v-btn @click="changeTable(`user`)" color="blue">Get users</v-btn>
    <v-btn @click="changeTable(`admin`)" color="green">Get Admins</v-btn>
    <pre>
      {{ gds }}
    </pre>
    <v-row no-gutters>
      <v-col cols="3">
        <v-text-field
          v-model="users.balance"
          type="number"
          solo-inverted
          label="balance"
          placeholder="balance"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="users.email"
          solo-inverted
          type="email"
          label="email"
          placeholder="email"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-select
          solo-inverted
          v-model="users.role"
          :items="roles"
          item-text="name"
          item-value="value"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          solo-inverted
          v-model="users.verified"
          :items="verified"
          item-text="name"
          item-value="value"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-btn @click="getUserTwice" block color="red">Users Filtyer</v-btn>
      </v-col>
    </v-row>

    <v-row no-gutters>
      <v-col cols="3">
        <v-text-field
          v-model="gds.order_number"
          type="number"
          solo-inverted
          label="order_number"
          placeholder="order_number"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="gds.card_cvv"
          solo-inverted
          type="number"
          label="card_cvv"
          placeholder="card_cvv"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-text-field
          v-model="gds.card_number"
          solo-inverted
          type="number"
          label="card_number"
          placeholder="card_number"
        ></v-text-field>
      </v-col>
      <v-col cols="3">
        <v-select
          solo-inverted
          v-model="gds.card_month"
          :items="status"
          item-text="name"
          item-value="value"
        ></v-select>
      </v-col>
      <v-col cols="3">
        <v-select
          solo-inverted
          v-model="gds.card_month"
          :items="status"
          item-text="name"
          item-value="value"
        ></v-select>
      </v-col>
      <v-col cols="12">
        <v-btn @click="getUserTwice" block color="red">Users Filtyer</v-btn>
      </v-col>
    </v-row>
    <!-- <v-data-table
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :headers="nowHeader"
      hide-default-footer
      :items="users"
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
      <template v-slot:item.partner>
        <v-btn color="red">BAN</v-btn>
        <v-btn color="green">unBAN</v-btn>
      </template>
    </v-data-table>
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        @input="gagination($event)"
      ></v-pagination>
    </div> -->
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      users: {
        balance: null,
        role: null,
        email: null,
        verified: null,
      },
      gds: {
        order_number: null,
        card_cvv: null,
        card_number: null,
        card_month: null,
        status: null,
      },
      roles: [
        { name: "admin", value: "admin" },
        { name: "user", value: "user" },
        { name: "Очистить", value: null },
      ],
      verified: [
        { name: "Верефицирован", value: true },
        { name: "Не верефицирован", value: false },
        { name: "Очистить", value: null },
      ],
      status: [
        { name: "Активна", value: true },
        { name: "Не Активна", value: false },
        { name: "Очистить", value: null },
      ],
      role: "user",
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      nowHeader: null,
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
    };
  },

  methods: {
    async getUserTwice() {
      if (!this.users.balance) {
        delete this.users.balance;
      } else {
        this.users.balance = parseInt(this.users.balance);
      }
      if (!this.users.role) delete this.users.role;
      if (!this.users.email) delete this.users.email;
      if (!this.users.verified) delete this.users.verified;
      await this.$axios.post(`/admin/users/all`, { users: this.users });
    },
    async getUsers({
      limit = this.itemsPerPage,
      page = this.page,
      role = this.role,
    }) {
      const { data } = await this.$axios.post(
        `/admin/users/all?limit=${limit}&page=${page}&role=${role}`
      );
      this.pageCount = data.totalPages;
      // this.users = data.users;
    },
    gagination(page) {
      this.getUsers({ page });
    },
    changeTable(role) {
      this.role = role;
      this.getUsers({ role, page: 1 });
    },
  },
  created() {
    this.nowHeader = this.headers_user;
    this.getUsers({});
  },
};
</script>

<style></style>
