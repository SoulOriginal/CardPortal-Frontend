<template>
  <div>
    123
    <v-dialog v-model="dialog" width="800">
      <div class="dialog-balance">
        <vue-widget
          shop_id="Cjx0wf2NnPVNwb2i"
          api_key="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODYyLCJleHAiOjg4MDUyODc2MjUxfQ.DmyJ0A1ZCgCqxmK9gYwF0d6hYHGqDYJs-jOCyF_gdRY"
          currency="USD"
          amount=""
        ></vue-widget>
      </div>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => ({ dialog: true }),
  head() {
    return {
      script: [
        {
          src: "https://cryptocloud.plus/widget/v2/js/app.js",
        },
      ],
      link: [
        {
          rel: "stylesheet",
          href: "https://cryptocloud.plus/widget/v2/css/app.css",
        },
      ],
    };
  },
  created() {
    this.$axios.post("/pay");
  },
};
</script>

<style lang="scss" scoped>
.dialog-balance {
  background-color: white;
  min-width: 500px;
}
.absolute-currency {
  top: 23.5px !important;
  right: 17% !important;
}
</style>
