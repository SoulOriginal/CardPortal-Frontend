<template>
  <card :title="$t('your_info')">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(update)">
        <!-- Name --> 
        <ValidationProvider v-slot="{ errors }" rules="required|min:20" name="form.name">
          <v-text-field
            v-model="form.name"
            :label="$t('name')"
            prepend-icon="mdi-account"
            type="text"
            dark
            required
          />
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider>
        <!-- Email -->
        <ValidationProvider v-slot="{ errors }" rules="required|email" name="form.email">
          <v-text-field 
            v-model="form.email"
            :label="$t('email')"
            name="email"
            prepend-icon="mdi-email"
            type="email"
            dark
            required
          />
          <span v-if="errors[0]" class="helper-text">{{$t(`validate.${errors[0]}`) }}</span>
        </ValidationProvider>
        <!-- Submit Button -->
        <div>
          <button type="submit" color="primary" class="mr-2 v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default primary">
            {{ $t('update') }}
          </button>
        </div>
      </form>
    </ValidationObserver> 
    <!-- <file-pond allow-multiple="true" max-files="3" server="/api"/> -->
    <file-pond
     class="file-pond"
      name="file"
      ref="pond"
      multiple
      label-idle="Drop files here..."
      v-bind:allow-multiple="false"
      accepted-file-types="image/jpeg, image/png"
      server="/api/data/image/upload"
      v-bind:files="myFiles"
      v-on:init="handleFilePondInit"
      v-on:addfile="setOptionsOnAddFile"
    />
  </card>
</template>

<script>
import { mapGetters } from "vuex";
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import vueFilePond, { setOptions } from 'vue-filepond';
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default { 
  layout: "seamen",
  scrollToTop: false,
  components: {
    ValidationObserver,
    ValidationProvider,
    FilePond
  },
  head() {
    return { title: this.$t("settings") };
  },

  data: () => ({
    myFiles: [],
    form:{
      name: "",
      email: "",
    },

  }),

  computed: mapGetters({
    user: "auth/user",
  }),
 
  created() {
    this.form.name = this.user.name
    this.form.email = this.user.email

    
  }, 
 
  methods: {
    async update() {
      const { data } = await this.$axios.post("/user/me/update", this.form);
      if(data.payload == "ok"){
        this.$vueOnToast.pop('success', this.$t('info_updated'))  
        this.$store.dispatch('auth/fetchUser')
      }
    },
    handleFilePondInit: function () {
      (this.$refs.pond.$el.children[0].children[1]).remove()
    },
  async  setOptionsOnAddFile() {
  setOptions ( { 
    server: {
      url: "/api/data/image/upload",
      process: {
        onerror: (response) => response.data,
        onload: (response) => {
          response = JSON.parse(response);
          console.log(response.link)
          this.$store.dispatch('auth/fetchUser')
        },
      },
    },
  });
},
  },
};
</script>
<style scoped>
#home-app-bar > div.card-body > div > div > a,
.filepond--root .filepond--credits,
.card-body > div > div > a{ 
  display: none;
  width: 0.1px;
  height: 0.1px;
}
.file-pond{
  margin-top: 15px;
}
</style>