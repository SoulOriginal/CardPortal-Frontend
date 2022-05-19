<template>
  <div class="row">
    <div class="col-lg-8 m-auto reset">
      <v-card
        v-if="auth"
        :title="$t('reset_password')"
        id="home-app-bar"
        class="pa-4"
      >
        <ValidationObserver v-slot="{ handleSubmit }">
          <form @submit.prevent="handleSubmit(reset)">
            <!-- Password -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|max:8|min:20"
              name="form.password"
            >
              <v-text-field
                id="password"
                ref="password"
                v-model="form.newPassword"
                :label="$t('password')"
                name="password"
                prepend-icon="mdi-lock"
                type="password"
                required
              />
              <span v-if="errors[0]" class="helper-text">{{
                $t(`validate.${errors[0]}`)
              }}</span>
            </ValidationProvider>
            <!-- Password Confirmation -->
            <ValidationProvider
              v-slot="{ errors }"
              rules="required|confirmed:form.password"
              name="form.password_confirmation"
            >
              <v-text-field
                id="confirm_password"
                v-model="form.repeatNewPassword"
                :label="$t('confirm_password')"
                name="confirm_password"
                prepend-icon="mdi-lock"
                type="password"
                required
              />
              <span v-if="errors[0]" class="helper-text">{{
                $t(`validate.${errors[0]}`)
              }}</span>
            </ValidationProvider>
            <!-- Submit Button -->
            <div>
              <v-btn type="submit" color="primary" block>
                {{ $t("reset_password") }}
              </v-btn>
            </div>
          </form>
        </ValidationObserver>
      </v-card>
      <v-card v-else class="pa-4">error </v-card>
      <card :title="$t('error_alert_title')" id="home-app-bar" v-else></card>
    </div>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  layout: "auth",
  head() {
    return { title: this.$t("reset_password") };
  },
  components: {
    ValidationObserver,
    ValidationProvider,
    // Card
  },

  data: () => ({
    auth: true,
    form: {
      newPassword: "",
      repeatNewPassword: "",
      email: "",
    },
  }),

  async mounted() {
    if (!this.$route.query.email) return;
    console.log(this.$route.query);
    this.form.email = this.$route.query.email;
    var DataChek = await this.$axios.post(`/user/chek/email`, {
      email: this.$route.query.email,
      remember_token: this.$route.query.token,
      type: "restore",
    });
    if (DataChek.data.payload == "ok") {
      this.auth = true;
    }
  },
  methods: {
    async reset() {
      var DataPassDone = await this.$axios.post(
        `/user/restore/password`,
        this.form
      );
      if (DataPassDone.data.newPassword == this.form.newPassword) {
        this.$vueOnToast.pop("success", this.$t("password_updated"));
        this.$router.push({ path: `/` });
      }
    },
  },
};
</script>
<style scoped>
.reset {
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
  background-color: #c91c1c;
}
</style>
