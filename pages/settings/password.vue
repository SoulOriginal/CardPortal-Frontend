<template>
  <card :title="$t('your_password')">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(update)">
        <!-- Name --> 
      <ValidationProvider v-slot="{ errors }" rules="required|max:8|min:20" name="form.password">
          <v-text-field
            id="password" 
            ref="password" 
            dark
            color="#337FF0"
            v-model="form.password_old"
            :label="$t('your_password')"
            name="password"
            prepend-icon="mdi-lock"
                   :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show ? 'text' : 'password'"
            required
            @click:append="show = !show"

          />
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|max:8|min:20" name="form.password">
          <v-text-field
            id="password"
            ref="password"
            dark
            color="#337FF0"
            v-model="form.password"
            :label="$t('new_password')"
            name="password"
            prepend-icon="mdi-lock"
            :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show ? 'text' : 'password'"
            required
            @click:append="show = !show"
            
          />
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
      </ValidationProvider>
      <ValidationProvider v-slot="{ errors }" rules="required|confirmed:form.password" name="form.password_confirmation">
        <v-text-field
          id="confirm_password"
          dark
          color="#337FF0"
          v-model="form.password_confirmation"
          :label="$t('confirm_password')"
          name="confirm_password"
          prepend-icon="mdi-lock"
                 :append-icon="show ? 'mdi-eye-outline' : 'mdi-eye-off-outline'"
            :type="show ? 'text' : 'password'"
            required
            @click:append="show = !show"
        />
        <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
      </ValidationProvider>
        <div> 
          <v-btn type="submit" color="#337FF0" block x-large>
              {{ $t('update') }}
          </v-btn>
        </div>
      </form>
    </ValidationObserver> 
  </card> 
</template>

<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
  scrollToTop: false,
  components: {
    ValidationObserver,
    ValidationProvider
  },
  head() {
    return { title: this.$t("settings") };
  },

  data: () => ({
    show:false,
    form: {
      password_old: "",
      password: "",
      password_confirmation: "",
    },
  }),

  methods: {
    async update() { 
      console.log(123)
      const { data } =  await this.$axios.post("/user/me/update/password",this.form);
      if(data.payload == "ok"){
        this.$vueOnToast.pop('success', this.$t('password_updated')) 
      }
    },
  },
};
</script>
<style scoped>
  .v-overflow-btn .v-input__slot::before {
    border-color: grey !important;
  }
</style>