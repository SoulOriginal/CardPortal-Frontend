<template>
  <div class="row">
    <div class="col-lg-8 m-auto email">
      <v-card class="pa-3" min-width="350">
        <div class="card-header">{{ $t("reset_password") }}</div>
        <v-text-field
          width="500"
          min-width="500"
          v-model="form.email"
          :label="$t('email')"
          prepend-icon="mdi-email"
          type="email"
          required
        />
        <!-- Submit Button -->
        <v-row
          no-gutters
          justify-content="center"
          align="center"
          justify="center"
          align-content="center"
        >
          <v-btn
            type="sumbit"
            color="red"
            :disabled="!form.email"
            @click="send"
            >{{ $t("send_password_reset_link") }}</v-btn
          >
        </v-row>
      </v-card>
    </div>
  </div>
</template>

<script>
import Form from "vform";

export default {
  layout: "auth",
  head() {
    return { title: this.$t("reset_password") };
  },

  data: () => ({
    status: "",
    form: new Form({
      email: "",
    }),
  }),
  methods: {
    async send() {
      if (
        !/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          this.form.email
        )
      ) {
        return this.$t("validate.email_validate");
      }
      var DataEmail = await this.$axios
        .post(`/user/restore/email`, {
          email: this.form.email,
          type: "restore",
        })
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });
      this.form.email = null;
      if (DataEmail.data.ok == "ok") {
        this.$store.dispatch("auth/saveEmail", this.form.email);
        this.form.reset();
        this.$vueOnToast.pop("success", this.$t("sended_password_reset_link"));
        // this.$router.push({ path: "/auth/restore-success" });
      } else {
        if (DataEmail.data.payload) {
          this.$vueOnToast.pop("error", DataEmail.data.payload);
        } else {
          this.$vueOnToast.pop("error", DataEmail.data);
        }
      }
    },
  },
};
</script>
<style scoped>
.email {
  min-height: calc(100vh - 147px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 40px;
  margin: 0 auto;
  color: white;
}
.card {
  width: 100%;
  max-width: 665px;
  border-radius: 20px;
  padding: 40px;
  background-color: #ffffff;
}
.card-header {
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 19px;
}
.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}
</style>
