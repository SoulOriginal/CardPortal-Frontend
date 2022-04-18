<template>
  <v-row align="center" justify="center" class="login">
    <div class="background">
      <video
        autoplay
        loop
        class="video-back"
        muted
        playsinline
        data-wf-ignore="true"
        data-object-fit="cover no-repeat"
      >
        <source src="/video/background.mp4" data-wf-ignore="true" />
        <source src="/video/background.webm" data-wf-ignore="true" />
      </video>
    </div>
    <v-col
      cols="12"
      sm="10"
      md="5"
      class="min-container"
      style="position: absolute"
    >
      <v-card class="elevation-12">
        <v-toolbar
          color="theme--light white--text"
          id="home-app-bar"
          flat
          class="header__login"
        >
          <v-toolbar-title>{{ $t("login") }}</v-toolbar-title>
          <v-spacer />
        </v-toolbar>
        <ValidationObserver v-slot="{ handleSubmit }">
          <form id="login-form" @submit.prevent="handleSubmit(login)">
            <v-card-text>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                name="form.email"
              >
                <v-text-field
                  v-model="form.email"
                  :label="$t('email')"
                  name="login"
                  prepend-icon="mdi-account"
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
                <!-- <v-text-field
                  id="password"
                  v-model="form.password"
                  :label="$t('password')"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  required
                /> -->
                <v-text-field
                  id="password"
                  v-model="form.password"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  prepend-icon="mdi-lock"
                  :type="show ? 'text' : 'password'"
                  name="password"
                  :label="$t('password')"
                  counter
                  @click:append="show = !show"
                ></v-text-field>
                <span v-if="errors[0]" class="helper-text">{{
                  $t(`validate.${errors[0]}`)
                }}</span>
              </ValidationProvider>
              <v-checkbox
                v-model="remember"
                class="mt-0"
                :label="$t('remember_me')"
              />
              <!-- <v-card-actions> -->
              <div class="buttons">
                <!-- <v-btn
                :disabled="!valid"
                color="primary"
                class="mt-n3"
                :loading="loading"
                form="login-form"
                @click="login()"
              >
                {{ $t('login') }}
              </v-btn> -->
                <button
                  type="submit"
                  color="primary"
                  class="mr-2 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary"
                >
                  {{ $t("login") }}
                </button>
                <div class="buttons">
                  <router-link
                    :to="{ name: 'password.request' }"
                    class="ml-2 mb-3 link"
                  >
                    {{ $t("forgot_password") }}
                  </router-link>

                  <router-link
                    :to="{ name: 'register' }"
                    class="ml-2 mb-3 link"
                  >
                    {{ $t("register") }}
                  </router-link>
                </div>
                <v-spacer />
              </div>
              <!-- </v-card-actions> -->
            </v-card-text>

            <!-- <router-link
                :to="{ name: 'home' }"
                class="ml-2 mb-6"
              >
                {{ $t('home') }}
              </router-link> -->
          </form>
        </ValidationObserver>
        <v-snackbar
          v-model="snackbar"
          :color="color"
          :right="'right'"
          :timeout="timeout"
          :top="'top'"
          outlined
        >
          {{ text }}
          <template v-slot:action="{ attrs }">
            <v-btn icon color="deep-orange" @click="snackbar = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  layout: "home",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  head() {
    return { title: this.$t("login") };
  },

  data: () => ({
    show: false,
    loading: false,
    form: {
      email: "",
      password: "",
    },
    valid: false,
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    passwordRules: [(v) => !!v || "Password is required"],
    remember: false,

    // snackbar
    color: "",
    snackbar: false,
    text: "",
    timeout: 6000,
    x: null,
    y: "top",
  }),

  methods: {
    async login() {
      let data;
      // Submit the form.
      try {
        const response = await this.$axios.post("/user/signin", this.form);
        data = response.data;
        if (!data.userJwt) {
          console.log(1234);
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
        // this.showSnack('success', 'You successfull logined in')
        this.$vueOnToast.pop("success", this.$t("you_are_logged_in"));
      } catch (e) {
        let error = e.response.data.message;
        if (!error) {
          error = e.response.data.error;
        }
        this.$vueOnToast.pop("error", error);
        return;
      }

      // Save the token.

      // Fetch the user.
      await this.$store.dispatch("auth/fetchUser");

      // Redirect home.
      this.$router.push("/" + (data.payload.user.role || "")).catch((error) => {
        if (error.name !== "NavigationDuplicated") {
          throw error;
        }
        console.log(error);
      });
      this.loading = false;
    },

    showSnack(type, text) {
      this.text = text;
      this.color = type;
      this.snackbar = true;
    },
  },
};
</script>
<style scoped>
.login {
  min-height: calc(100vh - 147px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  /* margin-top: 40px;
      margin-bottom: 40px; */
}
.card {
  width: 100%;
  max-width: 665px;
  border-radius: 20px;
  padding: 40px;
  background-color: #ffffff;
}
.link {
  font-size: 16px;
  color: #1976d2 !important;
  text-decoration: none;
  font-weight: 500;
}
.buttons {
  align-items: center;
  display: flex;
}
.header__login {
  display: flex;
  justify-content: center;
}
.min-container {
  min-width: 49%;
}
.background {
  position: relative;
  background-color: black;
  min-height: 50rem;
  width: 100%;
  overflow: hidden;
  background-color: rgba(4, 25, 44, 0.76);
}
.video-back {
  background-image: url("/img/5dff9887dcc8ad72956ca626_video-poster-00001.jpg");
  filter: blur(8px);
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  transform: translateX(-50%) translateY(-50%);
  opacity: 0.5;
  background-image: linear-gradient(
    to right,
    rgba(5, 11, 31, 0.8),
    rgba(5, 11, 31, 0.8)
  );
}
@media (max-width: 490px) {
  .buttons {
    flex-direction: column;
  }
}
.row {
  display: flex;
  flex-wrap: wrap;
  flex: 1 1 auto;
}
</style>
