<template>
  <div>
    <v-card class="pa-3 ma-2">
      Email: {{ user.email }}
      <span v-if="user.telegram"> Telegramm: {{ user.telegram || null }} </span>
    </v-card>
    <v-row no-gutters>
      <v-col cols="12" md="6">
        <v-card :title="$t('password')" class="pa-3 ma-1">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(update)">
              <!-- Name -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|max:8|min:20"
                name="form.password"
              >
                <v-text-field
                  id="password"
                  ref="password"
                  color="#337FF0"
                  v-model="form.password_old"
                  :label="$t('your_password')"
                  name="password"
                  prepend-icon="mdi-lock"
                  :append-icon="
                    show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                  "
                  :type="show ? 'text' : 'password'"
                  required
                  @click:append="show = !show"
                />
                <span v-if="errors[0]" class="helper-text">{{
                  $t(`validate.${errors[0]}`)
                }}</span>
              </ValidationProvider>
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|max:8|min:20"
                name="form.password"
              >
                <v-text-field
                  id="password"
                  ref="password"
                  color="#337FF0"
                  v-model="form.password"
                  :label="$t('new_password')"
                  name="password"
                  prepend-icon="mdi-lock"
                  :append-icon="
                    show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                  "
                  :type="show ? 'text' : 'password'"
                  required
                  @click:append="show = !show"
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
                  color="#337FF0"
                  v-model="form.password_confirmation"
                  :label="$t('confirm_password')"
                  name="confirm_password"
                  prepend-icon="mdi-lock"
                  :append-icon="
                    show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'
                  "
                  :type="show ? 'text' : 'password'"
                  required
                  @click:append="show = !show"
                />
                <span v-if="errors[0]" class="helper-text">{{
                  $t(`validate.${errors[0]}`)
                }}</span>
              </ValidationProvider>
              <div>
                <v-btn type="submit" color="primary" block>
                  {{ $t("update") }}
                </v-btn>
              </div>
            </form>
          </ValidationObserver>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card :title="$t('your_info')" class="pa-3 ma-1">
          <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(update_user)">
              <!-- Name -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|min:20"
                name="form_user.telegram"
              >
                <v-text-field
                  v-model="form_user.telegram"
                  label="Telegram"
                  prepend-icon="mdi-account"
                  type="text"
                  required
                />
                <span v-if="errors[0]" class="helper-text">{{
                  $t(`validate.${errors[0]}`)
                }}</span>
              </ValidationProvider>
              <!-- Email -->
              <ValidationProvider
                v-slot="{ errors }"
                rules="required|email"
                name="form_user.email"
              >
                <v-text-field
                  v-model="form_user.email"
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
              <!-- Submit Button -->
              <div>
                <v-btn type="submit" color="primary" block>
                  {{ $t("update") }}
                </v-btn>
              </div>
            </form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  scrollToTop: false,
  layout: "profile",
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  head() {
    return { title: this.$t("settings") };
  },

  data: () => ({
    show: false,
    form: {
      password_old: "",
      password: "",
      password_confirmation: "",
    },
    form_user: {
      telegram: "",
      email: "",
    },
  }),
  computed: mapGetters({
    user: "auth/user",
  }),
  mounted() {
    this.form_user = {
      email: this.user.email,
      telegram: this.user.telegram,
    };
  },
  methods: {
    async update() {
      const { data } = await this.$axios.post(
        "/user/me/update/password",
        this.form
      );
      if (data.payload == "ok") {
        this.$vueOnToast.pop("success", this.$t("password_updated"));
      } else {
        if (data.errorCode === "3") {
          this.$vueOnToast.pop("error", this.$t("validate.confirmed_validate"));
        }
      }
    },
    async update_user() {
      if (!this.form_user.email) {
        this.form_user.email = this.user.email;
      }
      const { data } = await this.$axios.post(
        "/user/me/update",
        this.form_user
      );
    },
  },
};
</script>
<style scoped>
.v-overflow-btn .v-input__slot::before {
  border-color: grey !important;
}
</style>
