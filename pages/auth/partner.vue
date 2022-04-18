<template>
  <div>
    <v-row no-gutters justify="center">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card
          :class="$vuetify.breakpoint.name == `sm` ? `pa-2` : `pa-0`"
          height="100%"
          elevation="0"
        >
          <v-list-item-content class="pa-5">
            <v-row no-gutters>
              <v-btn @click="$router.go(-1)" large icon color="red">
                <v-icon>mdi-arrow-left</v-icon>
              </v-btn>
              <div class="d-flex justify-center mb-4" style="width: 100%">
                <v-img
                  lazy-src="../dark2.png"
                  max-height="33"
                  max-width="250"
                  contain
                  src="../dark2.png"
                >
                </v-img>
              </div>
            </v-row>

            <h3 class="text-center mt-3">{{ $t(`register`) }}</h3>
          </v-list-item-content>

          <ValidationObserver v-slot="{ handleSubmit }">
            <form
              id="login-form"
              @submit.prevent="handleSubmit(register__partner)"
            >
              <v-card-text>
                <ValidationProvider v-slot="{ errors }" rules="required">
                  <v-text-field
                    v-model="register.firm_name"
                    :label="$t('firm_name')"
                    name="сompany"
                    persistent-placeholder
                    placeholder=" "
                    clearable
                    class="mt-3 mb-3"
                    type="text"
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
                  rules="required|max:10|min:10"
                >
                  <v-text-field
                    v-model="register.NIP"
                    :label="$t('NIP')"
                    name="NIP"
                    persistent-placeholder
                    placeholder=" "
                    clearable
                    class="mt-3 mb-3"
                    type="number"
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
                  rules="required|max:9|min:9"
                >
                  <v-text-field
                    v-model="register.phone"
                    :label="$t('phone')"
                    name="phone"
                    persistent-placeholder
                    placeholder=" "
                    clearable
                    prefix="+48"
                    class="mt-3 mb-3"
                    type="number"
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

                <ValidationProvider v-slot="{ errors }" rules="required">
                  <places
                    v-model="register.address"
                    :placeholder="$t('address')"
                    @change="
                      (val) => {
                        city_data = val;
                      }
                    "
                    :options="{
                      style: true,
                      type: 'address',
                      locate: false,
                      getRankingInfo: true,
                      language: $i18n.locale,
                      countryCode: 'PL',
                      country: 'poland',
                      countries: ['pl'],

                      templates: {
                        value: (suggestion) =>
                          `${suggestion.name}, ${suggestion.city}`,
                      },
                    }"
                  >
                  </places>

                  <v-card
                    v-if="errors[0]"
                    elevation="3"
                    class="pa-2 red--text body-1 mb-1 mt-2"
                  >
                    <v-icon color="red">mdi-alert-circle-outline</v-icon>
                    {{ $t(`validate.${errors[0]}`) }}
                  </v-card>
                </ValidationProvider>

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
                    append-outer-icon="mdi-lock-reset"
                    @click:append-outer="generatePassword()"
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
                  color="red lighten-2 white--text"
                  block
                  type="submit"
                  >{{ $t("register") }}</v-btn
                >
                <v-btn
                  to="/login"
                  class="text-capitalize font-weight-regular mt-6"
                  color="red lighten-2 white--text"
                  block
                  >{{ $t("login") }}</v-btn
                >
              </v-card-text>
            </form>
          </ValidationObserver>
        </v-card>
      </v-col>
      <v-col cols="8" v-if="$vuetify.breakpoint.width >= 1264">
        <v-carousel
          interval="6500"
          cycle
          continuous
          touchless
          height="100vh"
          :show-arrows="false"
          hide-delimiters
          reverse-transition="fade-transition"
          transition="fade-transition"
        >
          <v-carousel-item
            v-for="(item, i) in 12"
            :src="`../getman-imges/` + i + `.jpg`"
            :key="i"
            height="100vh"
          >
          </v-carousel-item> </v-carousel
      ></v-col>
    </v-row>
    <preload :end="preloader" :opacity="0.9" />
  </div>
</template>

<script>
import preload from "@/components/LoadingBar";
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Places from "vue-places";
export default {
  layout: "default",
  components: {
    ValidationObserver,
    ValidationProvider,
    Places,
    preload,
  },
  head() {
    return { title: this.$t("login") };
  },
  data() {
    return {
      register: {
        email: null,
        password: null,
        password_confirmation: null,
        firm_name: null,
        NIP: null,
        phone: null,
        address: null,
      },
      show: false,
      preloader: false,
      show2: false,
    };
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
    async register__partner() {
      this.preloader = true;
      let new_register = {
        ...this.register,
        type: `partner`,
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

.ap-icon-pin,
.ap-nostyle-icon-pin,
.ap-nostyle-input-icon {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  margin: 0;
  display: none;
}
.ap-input {
  border: unset;
  padding-left: unset;
  border-bottom: 0.8px solid rgba(0, 0, 0, 0.425) !important;
  border-radius: 0 !important;
}
.ap-suggestions {
  font-family: sans-serif;
}
.ap-footer {
  display: none;
  margin: 0;
  padding: 0;
}
</style>
