<template>
  <v-container class="relative pa-0" fluid fill-height>
    <v-row no-gutters justify="center">
      <v-card
        :class="$vuetify.breakpoint.name == `sm` ? `pa-2` : `pa-0`"
        height="100%"
        elevation="0"
      >
        <ValidationObserver v-slot="{ handleSubmit }">
          <form
            id="login-form"
            @submit.prevent="handleSubmit(login_auth)"
            style="min-width: 375px"
          >
            <v-card-text>
              <ValidationProvider v-slot="{ errors }" rules="required|email">
                <v-text-field
                  v-model="login.email"
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
              >
                <v-text-field
                  v-model="login.password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
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

              <v-btn
                text
                small
                color="blue"
                :to="{ name: 'password.request' }"
                class="text-decoration-underline text-capitalize font-weight-regular float-right"
                >{{ $t("forgot_password") }}</v-btn
              >
              <v-btn
                class="text-capitalize font-weight-regular mt-15"
                color="red lighten-2 white--text"
                block
                type="submit"
                >{{ $t("login") }}</v-btn
              >
            </v-card-text>
          </form>
        </ValidationObserver>
      </v-card>
    </v-row>

    <preload :end="loading" :opacity="0.9" />
  </v-container>
</template>

<script>
import preload from "@/components/LoadingBar";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  layout: "auth",
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
      login: {
        email: "",
        password: "",
      },
      show: false,
      show2: false,
      loading: false,
    };
  },
  methods: {
    async login_auth() {
      let data;
      try {
        this.loading = true;
        const response = await this.$axios.post("/user/signin", this.login);
        data = response.data;
        if (!data) {
          return (this.loading = false);
        }
        if (!data.userJwt) {
          if (data.error) {
            if (data.error.errorCode == 1) {
              this.$vueOnToast.pop("error", this.$t("errorCode.1"));
              this.loading = false;
              return;
            }
            if (data.error.errorCode == 2) {
              this.$vueOnToast.pop("error", this.$t("errorCode.2"));
              this.loading = false;
              return;
            }
          }
          if (data.errorCode == 3) {
            this.$vueOnToast.pop("error", this.$t("errorCode.3"));
            this.loading = false;
            return;
          }
          if (data.errorCode == 4) {
            this.$vueOnToast.pop("error", this.$t("errorCode.4"));
            this.loading = false;
            return;
          }
          if (data.errorCode == 5) {
            this.$vueOnToast.pop("error", this.$t("errorCode.5"));
            this.loading = false;
            return;
          }
          if (data.errorCode == 6) {
            this.$vueOnToast.pop("error", this.$t("errorCode.6"));
            this.loading = false;
            return;
          }
          if (data.errorCode == 7) {
            this.$vueOnToast.pop("error", this.$t("errorCode.7"));
            this.loading = false;
            return;
          }
        }
      } catch (e) {
        // let error = e.response.data.message;
        // if (!error) {
        //   error = e.response;
        // }
        this.$vueOnToast.pop("error", e);
        this.loading = false;
        return;
      }

      // Save the token.
      this.$store.dispatch("auth/saveToken", {
        token: data.userJwt,
        remember: this.remember,
        role: data.payload.user.role,
      });

      // Fetch the user.
      await this.$store.dispatch("auth/fetchUser");

      // Redirect home.
      this.$router.push("/" + (data.payload.user.role || "")).catch((error) => {
        if (error.name !== "NavigationDuplicated") {
          this.loading = false;
          throw error;
        }
        console.log(error);
      });
      this.loading = false;
      this.$vueOnToast.pop("success", this.$t("you_are_logged_in"));
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
.relative {
  position: relative !important;
}
</style>
