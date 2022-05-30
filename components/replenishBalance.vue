<template>
  <div>
    <v-dialog v-model="dialog" width="800">
      <div class="dialog-balance pa-4">
        <v-row align="center">
          <v-col cols="12" sm="6" md="4">
            <v-text-field
              v-model="custom_amount"
              placeholder="Сумма пополнения"
              filled
              rounded
              outlined
              name="amount"
              type="number"
              hide-details
              :disabled="send_req"
              min="1"
              max="10000"
              prefix="USD"
              suffix="$"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="8"
            ><v-btn large block @click="getPayUrl" :disabled="send_req"
              >Пополнить счет на {{ custom_amount }}$</v-btn
            ></v-col
          >
        </v-row>
        <transition>
          <v-btn link block v-if="pay_url" @click="openBankPage"
            >Открыть страницу ополнения</v-btn
          >
        </transition>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["open"],
  data: () => ({
    dialog: false,
    custom_amount: 1,
    send_req: false,
    pay_url: null,
  }),
  methods: {
    async getPayUrl() {
      // await this.$axios.get("/pay/history");
      // return;
      this.send_req = true;
      const { data } = await this.$axios.post("/pay", {
        custom_amount: this.custom_amount,
      });
      if (!data) return;
      if (!data.pay_url) return;
      this.pay_url = data.pay_url;
      this.openBankPage(data.pay_url);
    },
    openBankPage(url) {
      window.open(url || this.pay_url, "_blank");
    },
    async getPayStatus() {
      // this.$axios.post("/pay", { custom_amount: 2 });
      const { data } = await this.$axios.get("/pay/status");
    },
  },

  watch: {
    open(newState) {
      this.dialog = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog-balance {
  background-color: white !important;
}
.absolute-currency {
  top: 23.5px !important;
  right: 17% !important;
}
</style>
