<template>
  <v-container fill-height class="pa-0">
    <v-row class="justify-center align-center pa-0">
      <v-col cols="12" sm="7" md="5" lg="4" class="pa-0">
        <v-card
          :disabled="preloader"
          :class="$vuetify.breakpoint.name == `sm` ? `pa-2` : `pa-0`"
          height="100%"
          elevation="5"
        >
          <v-list-item-content class="pa-5">
            <v-row no-gutters>
              <v-btn @click="$router.go(-1)" large icon color="red">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <div class="d-flex justify-center mb-4" style="width: 100%">
                <v-img max-height="33" max-width="250" contain alt="logo">
                </v-img>
              </div>
            </v-row>

            <h3 class="text-center mt-3">
              {{ $t("register") }}
            </h3>
          </v-list-item-content>

          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              id="login-form"
              @submit.prevent="handleSubmit(register__user)"
            >
              <v-card-text>
                <ValidationProvider v-slot="{ errors }" rules="required|email">
                  <v-text-field
                    v-model="register.email"
                    :label="$t('email')"
                    name="login"
                    persistent-placeholder
                    placeholder=" "
                    clearable
                    class="mt-3 mb-3"
                    type="email"
                    hide-details
                    required
                  />

                  <v-card
                    v-if="errors[0]"
                    elevation="3"
                    class="pa-2 red--text body-1 mb-1 mt-2"
                  >
                    <v-icon color="red">mdi-alert-circle-outline</v-icon>
                    {{ $t(`validate.${errors[0]}`) }}
                  </v-card>
                </ValidationProvider>
                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|max:8|min:30"
                  name="register.password"
                >
                  <v-text-field
                    v-model="register.password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    append-outer-icon="mdi-lock-reset"
                    @click:append-outer="generatePassword()"
                    :type="show ? 'text' : 'password'"
                    name="password"
                    hide-details
                    class="mt-3 mb-3"
                    persistent-placeholder
                    placeholder=" "
                    :label="$t('password')"
                    @click:append="show = !show"
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

                <ValidationProvider
                  v-slot="{ errors }"
                  rules="required|confirmed:register.password"
                >
                  <v-text-field
                    id="confirm_password"
                    append-outer-icon="mdi-lock-reset"
                    @click:append-outer="generatePassword()"
                    v-model="register.password_confirmation"
                    :label="$t('confirm_password')"
                    name="confirm_password"
                    :type="show2 ? 'text' : 'password'"
                    hide-details
                    :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
                    persistent-placeholder
                    placeholder=" "
                    required
                    @click:append="show2 = !show2"
                  />
                  <v-card
                    v-if="errors[0]"
                    elevation="3"
                    class="pa-2 red--text body-1 mb-1 mt-2"
                  >
                    <v-icon color="red">mdi-alert-circle-outline</v-icon>
                    {{ $t(`validate.${errors[0]}`) }}
                  </v-card>
                </ValidationProvider>

                <v-btn
                  class="text-capitalize font-weight-regular mt-15"
                  color="purple accent-4 white--text"
                  block
                  type="submit"
                  >{{ $t("register") }}</v-btn
                >
                <v-btn
                  to="/login"
                  class="text-capitalize font-weight-regular mt-5"
                  color="teal darken-1 white--text"
                  block
                  >{{ $t("login") }}</v-btn
                >
              </v-card-text>
            </form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
    <preload :end="preloader" :opacity="0.9" :animation="animation" />
  </v-container>
</template>

<script>
import preload from "@/components/LoadingBar";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  layout: "default",
  components: {
    ValidationObserver,
    ValidationProvider,
    preload,
  },
  head() {
    return { title: this.$t("login") };
  },
  data() {
    return {
      register: {
        email: "",
        password: "",
        password_confirmation: "",
      },
      show: false,
      show2: false,
      loading: false,
      preloader: false,
      animation: false,
    };
  },
  created() {
    // this.$axios.defaults.baseURL = process.env.apiUrl;
    console.log(this.$axios.defaults);
  },
  methods: {
    generatePassword() {
      var length = 15,
        charset =
          "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
      for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
      }
      this.register.password = retVal;
      this.register.password_confirmation = retVal;
    },
    async register__user() {
      this.preloader = true;
      let new_register = {
        ...this.register,
        type: `user`,
      };
      var res = await this.$axios.post("/user/signup", new_register);
      res = res.data;
      if (res.payload !== "ok") {
        this.preloader = false;
        return this.$vueOnToast.pop("error", this.$t(res.payload));
      }
      var DataEmail = await this.$axios
        .post(`/user/restore/email`, {
          email: new_register.email,
          type: "verified",
        })
        .then(function (response) {
          return response;
        })
        .catch(function (error) {
          this.preloader = false;
          console.log(error);
        });

      if (DataEmail.data.ok == "ok") {
        this.preloader = false;
        this.$store.dispatch("auth/saveEmail", new_register.email);
        this.$vueOnToast.pop("success", this.$t("verify_email_address"));
        this.$router.push({ path: "/login" });
      }
    },
  },
};
</script>

<style lang="scss">
html {
  overflow: auto;
}
.v-stepper__wrapper {
  height: 100%;
}
.abs-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
