<template>
  <div>
    <v-btn @click="changeTable(`user`)" color="blue">Get users</v-btn>
    <v-btn @click="changeTable(`admin`)" color="green">Get Admins</v-btn>

    <v-data-table
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
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      role: "user",
      page: 1,
      pageCount: 1,
      itemsPerPage: 10,
      users: [],
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
    async getUsers({
      limit = this.itemsPerPage,
      page = this.page,
      role = this.role,
    }) {
      const { data } = await this.$axios.get(
        `/admin/users/all?limit=${limit}&page=${page}&role=${role}`
      );
      this.pageCount = data.totalPages;
      this.users = data.users;
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
