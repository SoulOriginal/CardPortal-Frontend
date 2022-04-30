<template>
  <div>
    <v-dialog v-model="dialog" max-width="600px">
      <v-card class="pa-5" style="overflow: hidden">
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            id="login-form"
            @submit.prevent="
              handleSubmit(
                !form._id
                  ? ModisyOrCreateRecordOnConfig('post')
                  : ModisyOrCreateRecordOnConfig('put')
              )
            "
          >
            <v-row no-gutters>
              <v-col cols="6">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-text-field
                    v-model="form.availability"
                    hide-details
                    label="В наличии"
                    type="number"
                  ></v-text-field>
                  <v-card
                    v-if="errors[0]"
                    elevation="3"
                    class="pa-2 red--text body-1 mb-1 mt-2"
                  >
                    <v-icon color="red">mdi-alert-circle-outline</v-icon>
                    {{ $t(`validate.${errors[0]}`) }}
                  </v-card>
                </ValidationProvider>
              </v-col>
              <v-col cols="6">
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-select
                    :items="items_currencies"
                    v-model="form.currency_card"
                    item-text="name"
                    item-value="name"
                    label="Валюта на карте"
                  ></v-select>
                  <v-card
                    v-if="errors[0]"
                    elevation="3"
                    class="pa-2 red--text body-1 mb-1 mt-2"
                  >
                    <v-icon color="red">mdi-alert-circle-outline</v-icon>
                    {{ $t(`validate.${errors[0]}`) }}
                  </v-card>
                </ValidationProvider>
              </v-col>
            </v-row>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <v-text-field
                v-model="form.name"
                type="text"
                label="Название товара"
              ></v-text-field>
              <v-card
                v-if="errors[0]"
                elevation="3"
                class="pa-2 red--text body-1 mb-1 mt-2"
              >
                <v-icon color="red">mdi-alert-circle-outline</v-icon>
                {{ $t(`validate.${errors[0]}`) }}
              </v-card>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <v-text-field
                v-model="form.price"
                label="Цена карты"
                type="number"
              ></v-text-field>
              <v-card
                v-if="errors[0]"
                elevation="3"
                class="pa-2 red--text body-1 mb-1 mt-2"
              >
                <v-icon color="red">mdi-alert-circle-outline</v-icon>
                {{ $t(`validate.${errors[0]}`) }}
              </v-card>
            </ValidationProvider>
            <ValidationProvider v-slot="{ errors }" rules="required">
              <v-text-field
                v-model="form.balance"
                label="Баланс карт в категории"
                type="number"
              ></v-text-field>
              <v-card
                v-if="errors[0]"
                elevation="3"
                class="pa-2 red--text body-1 mb-1 mt-2"
              >
                <v-icon color="red">mdi-alert-circle-outline</v-icon>
                {{ $t(`validate.${errors[0]}`) }}
              </v-card>
            </ValidationProvider>
            <v-select
              :items="items_currencies"
              v-model="form.сurrency_sale"
              item-text="name"
              item-value="name"
              label="Валюта продажи"
            ></v-select>
            <v-file-input
              show-size
              v-model="img_file"
              @change="uploadImage"
            ></v-file-input>
            <v-img
              max-height="200"
              class="img_prew"
              :lazy-src="imgPrew"
              :src="imgPrew"
              contain
            ></v-img>
            <v-card-actions>
              <v-btn color="primary" block type="submit">{{
                !form._id ? `Создать конфигурацию` : `Обновить конфирурацию`
              }}</v-btn>
            </v-card-actions>
          </form>
        </ValidationObserver>
      </v-card>
    </v-dialog>
    <v-card class="pa-2">
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <!--         :sort-by="[
          'name',
          'price',
          'availability',
          'currency_card',
          'сurrency_sale',
        ]" -->
      <v-data-table
        :headers="headers"
        :items="categoriesConfig"
        :search="search"
        multi-sort
        :sort-desc="[false, true]"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn
              color="red lighten-1"
              dark
              fab
              small
              class="mb-2"
              @click="dialog = true"
            >
              <v-icon color="pink lighten-5">mdi-plus</v-icon>
            </v-btn>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-btn color="light-green" small @click="editById(item._id)"
            ><v-icon color="white">mdi-pencil</v-icon></v-btn
          >
          <v-btn color="red accent-4" small @click="deleteConfig(item._id)"
            ><v-icon color="white">mdi-delete</v-icon>
          </v-btn>
          <v-btn
            small
            color="teal"
            @click="setConfigActive(!item.active, item._id)"
            >{{ item.active ? "" : "Не " }} Активна
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
  </div>
</template>

<script>
import preload from "@/components/LoadingBar";
import { mapGetters, mapActions } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  layout: "admin",
  components: {
    ValidationObserver,
    ValidationProvider,
    preload,
  },
  data() {
    return {
      form: {
        name: "",
        price: 0,
        balance: 0,
        availability: 0,
        currency_card: "USD",
        сurrency_sale: "USD",
      },
      allConfigs: [],
      img_file: [],
      imgPrew: null,
      items: [
        {
          name: "MasterCard",
          id: 1,
        },
        {
          name: "Visa",
          id: 2,
        },
        {
          name: "American Express",
          id: 3,
        },
        {
          name: "UnionPay",
          id: 4,
        },
        {
          name: "JCB",
          id: 5,
        },
      ],
      items_currencies: [
        {
          name: "USD",
          id: 1,
        },
        {
          name: "EUR",
          id: 2,
        },
        {
          name: "RUB",
          id: 3,
        },
        {
          name: "ZL",
          id: 4,
        },
      ],
      // "MasterCard", "Visa", "American Express", "UnionPay", "JCB"
      search: "",
      dialog: false,
      headers: [
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
        {
          text: "Действия",
          value: "actions",
          filterable: false,
          align: "center",
        },
      ],
      headers2: [
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
    ...mapGetters({
      cleanObj: "cleanObj",
      categoriesConfig: "admin/categoriesConfig",
    }),
  },
  methods: {
    ...mapActions({
      fetchCategories: "admin/fetchCategories",
    }),
    uploadImage() {
      this.imgPrew = URL.createObjectURL(this.img_file);
    },
    editById(someId) {
      this.form = this.categoriesConfig.filter((v) => v._id === someId)[0];
      this.dialog = true;
    },
    closeDialog() {
      this.dialog = false;
      this.form = this.cleanObj(this.form);
    },
    async getConfigs() {
      await this.fetchCategories();
    },
    async deleteConfig(id) {
      var isPermision = confirm("Вы действительно хотите удалить эту запись?");
      if (!isPermision) return;
      await this.$axios.delete(`/profile/admin/conf/${id}`);
      this.getConfigs();
    },
    async setConfigActive(someActiveStatus, id) {
      await this.$axios.put(`/profile/admin/conf/active/`, {
        _id: id,
        active: someActiveStatus,
      });
      this.getConfigs();
    },
    async ModisyOrCreateRecordOnConfig(method) {
      await this.$axios[method]("/profile/admin/conf", this.form);
      this.closeDialog();
      this.getConfigs();
    },
  },
  watch: {
    dialog(newVal) {
      if (newVal === false) {
        this.form = this.cleanObj(this.form);
      }
    },
  },
  created() {
    this.getConfigs();
  },
};
</script>
