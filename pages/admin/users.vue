<template>
  <div>
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
    <v-dialog v-model="edit_user" max-width="700px">
      <v-card class="pa-4" v-if="timeOpenedModal">
        <v-text-field
          solo-inverted
          v-model="timeOpenedModal.balance"
          placeholder="Баланс"
          type="number"
        ></v-text-field>
        <v-text-field
          solo-inverted
          v-model="timeOpenedModal.email"
          placeholder="Почта"
        ></v-text-field>
        <v-btn block color="red" @click="editUser">Сохранить</v-btn>
      </v-card>
    </v-dialog>
    <v-data-table
      :page.sync="page"
      :items-per-page="itemsPerPage"
      :headers="headers_user"
      hide-default-footer
      :items="dataAsync"
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
    <div class="text-center pt-2">
      <v-pagination
        v-model="page"
        :length="pageCount"
        @input="gagination($event)"
      ></v-pagination>
    </div>
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
      timeOpenedModal: {},
      edit_user: false,
      dataAsync: [],
      roles: [
        { name: "admin", value: "admin" },
        { name: "user", value: "user" },
        { name: "Очистить", value: null },
      ],
      verified: [
        { name: "Верифицирован", value: true },
        { name: "Не верифицирован", value: false },
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
      headers_user: [
        {
          text: "Email",
          align: "start",
          sortable: false,
          value: "email",
        },
        { text: "Верифицирован", value: "verified" },
        { text: "Баланс", value: "balance" },
        { text: "Дата создания", value: "create_date" },
        { text: "Действия", value: "actions", sortable: false },
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
      if (this.users.verified === null) delete this.users.verified;
      const limit = this.itemsPerPage,
        page = this.page;
      const { data } = await this.$axios.post(
        `/admin/users/all?limit=${limit}&page=${page}`,
        {
          users: this.users,
        }
      );
      this.dataAsync = data.data;
      this.pageCount = data.totalPages;
    },
    openModalById(id) {
      this.timeOpenedModal = this.dataAsync.filter((v) => v._id === id)[0];
      this.edit_user = true;
    },
    async editUser() {
      var { balance, email, _id } = this.timeOpenedModal;
      balance = parseInt(balance);
      await this.$axios.put("/admin/user", { balance, email, _id });
      this.getUserTwice();
      this.edit_user = false;
    },
    gagination(page) {
      this.page = page;
      this.getUserTwice();
    },
    changeTable(role) {
      this.role = role;
      this.getUsers({ role, page: 1 });
    },
  },
  created() {
    this.getUserTwice();
  },
};
</script>

<style></style>
