<template>
  <v-row align="center" justify="center" class="header__login auth">
    <v-col cols="12" sm="8" md="4">
      <v-card>
        <v-toolbar id="home-app-bar" dark flat>
          <v-toolbar-title style="width: 100%" class="flex text-center">
            {{ $t("register") }}
          </v-toolbar-title>

          <v-spacer />

          <template v-slot:extension>
            <v-tabs v-model="tab" icons-and-text centered dark>
              <v-tabs-slider color="yellow" />
              <v-tab href="#user" class="text-black-50">
                Пользователь
                <v-icon>mdi-account</v-icon>
              </v-tab>
              <v-tab href="#partner">
                Партнер
                <v-icon>mdi-briefcase</v-icon>
              </v-tab>
            </v-tabs>
          </template>
        </v-toolbar>
        <v-tabs-items v-model="tab">
          <v-tab-item value="user">
            <v-card flat>
              <ValidationObserver v-slot="{ handleSubmit }">
                <form
                  id="register-form"
                  @submit.prevent="handleSubmit(register)"
                >
                  <v-card-text>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|min:30"
                      name="form.name"
                    >
                      <v-text-field
                        v-model="form.name"
                        :label="$t('name')"
                        prepend-icon="mdi-account"
                        type="text"
                        required
                      />
                      <span v-if="errors[0]" class="helper-text">{{
                        $t(`validate.${errors[0]}`)
                      }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|email"
                      name="form.email"
                    >
                      <v-text-field
                        v-model="form.email"
                        :label="$t('email')"
                        name="email"
                        prepend-icon="mdi-email"
                        type="email"
                        required
                      />
                      <span v-if="errors[0]" class="helper-text">{{
                        $t(`validate.${errors[0]}`)
                      }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|max:8|min:30"
                      name="form.password"
                    >
                      <v-text-field
                        id="password"
                        ref="password"
                        v-model="form.password"
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
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|confirmed:form.password"
                      name="form.password_confirmation"
                    >
                      <v-text-field
                        id="confirm_password"
                        v-model="form.password_confirmation"
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
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />
                    <button
                      type="submit"
                      color="primary"
                      class="mb-4 mr-2 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"
                    >
                      {{ $t("register") }}
                    </button>
                  </v-card-actions>
                </form>
              </ValidationObserver>
            </v-card>
          </v-tab-item>
          <v-tab-item value="partner">
            <v-card flat>
              <ValidationObserver v-slot="{ handleSubmit }">
                <form
                  id="register-form"
                  @submit.prevent="handleSubmit(register)"
                >
                  <v-card-text>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|min:20"
                    >
                      <v-text-field
                        v-model="companyForm.name"
                        :label="$t('name')"
                        name="name"
                        prepend-icon="mdi-account"
                        type="text"
                        required
                      />
                      <span v-if="errors[0]" class="helper-text">{{
                        $t(`validate.${errors[0]}`)
                      }}</span>
                    </ValidationProvider>

                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|email"
                    >
                      <v-text-field
                        v-model="companyForm.email"
                        :label="$t('email')"
                        name="email"
                        prepend-icon="mdi-email"
                        type="email"
                        required
                      />
                      <span v-if="errors[0]" class="helper-text">{{
                        $t(`validate.${errors[0]}`)
                      }}</span>
                    </ValidationProvider>
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|max:8|min:20"
                      name="companyForm.password"
                    >
                      <v-text-field
                        id="password"
                        ref="password"
                        v-model="companyForm.password"
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
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|confirmed:companyForm.password"
                    >
                      <v-text-field
                        id="confirm_password"
                        v-model="companyForm.password_confirmation"
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
                    <ValidationProvider
                      v-slot="{ errors }"
                      rules="required|confirmed:companyForm.password"
                    >
                      <v-select
                        prepend-icon="mdi-handshake"
                        :items="partner_selected"
                        label="label"
                      ></v-select>
                      <span v-if="errors[0]" class="helper-text">{{
                        $t(`validate.${errors[0]}`)
                      }}</span>
                    </ValidationProvider>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer />

                    <button
                      type="submit"
                      color="primary"
                      class="mb-4 mr-2 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"
                    >
                      {{ $t("register") }}
                    </button>
                  </v-card-actions>
                </form>
              </ValidationObserver>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  layout: "home",
  // middleware: 'guest',
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  head() {
    return { title: this.$t("register") };
  },

  data: () => ({
    validUser: false,
    validCompany: false,
    apiError: "",
    partner_selected: [
      "shope_or_more_shops_partner",
      "store_partner",
      `auto_deliver_partner`,
    ],
    tab: null,
    form: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    companyForm: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
    mustVerifyEmail: false,
  }),
  watch: {
    form() {
      this.companyForm.name = "";
      this.companyForm.email = "";
      this.companyForm.password = "";
      this.companyForm.password_confirmation = "";
    },
    companyForm() {
      this.form.name = "";
      this.form.email = "";
      this.form.password = "";
      this.form.password_confirmation = "";
    },
  },

  methods: {
    async register() {
      if (this.tab === "user") {
        var data = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.password_confirmation,
          type: "seamen",
        };
      } else if (this.tab === "partner") {
        var data = {
          name: this.companyForm.name,
          company: this.companyForm.company,
          email: this.companyForm.email,
          password: this.companyForm.password,
          password_confirmation: this.companyForm.password_confirmation,
          type: "company",
        };
      }
      var res = await this.$axios.post("/user/signup", data);
      res = res.data;
      console.log(res.payload);
      if (res.payload !== "ok") {
        this.$vueOnToast.pop("error", res.payload);
        return;
      }
      var DataEmail = await this.$axios
        .post(`/user/restore/email`, {
          email: data.email,
          type: "verified",
        })
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          console.log(error);
        });

      if (DataEmail.data.ok == "ok") {
        this.$store.dispatch("auth/saveEmail", data.email);
        this.$vueOnToast.pop("success", this.$t("verify_email_address"));
        this.$router.push({ path: "/login" });
      }

      // if (res.status) {
      //   // this.mustVerifyEmail = true
      //   this.$vueOnToast.pop('success', this.$t('verify_email_address'))
      // }
      //  else {
      // Log in the user.
      // const {
      //   data: { token }
      // } = await axios.post('/login', {
      //   name: this.form.name,
      //   email: this.form.email,
      //   password: this.form.password,
      //   password_confirmation: this.form.password_confirmation
      // })

      // // Save the token.
      // this.$store.dispatch('auth/saveToken', { token })

      // // Update the user.
      // await this.$store.dispatch('auth/updateUser', { user: data })

      // // Redirect home.
      // if (this.tab === 'seamen') {
      //   this.$router.push('/seamen')
      // } else {
      //   this.$router.push('/employer')
      // }
      // }
    },
  },
  computed: {
    UserValid() {
      return (
        this.passwordCheck.minimumLength &&
        this.passwordCheck.special &&
        this.passwordCheck.uppercase
      );
    },
  },
};
</script>
<style scoped>
.v-btn {
  width: 100%;
}
.header__login {
  display: flex;
  justify-content: center;
}
.auth {
  min-height: calc(100vh - 147px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* margin-top: 40px;
      margin-bottom: 40px; */
}
.register-button {
  padding: 0 8px;
  height: 36px;
  min-width: 64px;
  font-size: 0.875rem;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%),
    0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);
}
</style>
