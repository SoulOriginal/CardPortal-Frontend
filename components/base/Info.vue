<template>
  <v-theme-provider :dark="dark">
    <div>
      <div class="d-flex justify-center mb-4">
        <v-img
          contain
          max-width="200"
          position="center"
          width="100%"
          src="/images/logo-white.svg"
        />
      </div>

      <base-title
        v-if="false"
        size="body-1"
        class="d-flex justify-center"
        space="4"
        title="OneClickMarine.com"
        weight="regular"
      />

      <base-body>
        {{ $t('copyright_text') }}
      </base-body>

      <v-btn class="mb-4" color="primary" to="/about">
        {{ $t('more_info') }}
      </v-btn>
    </div>
  </v-theme-provider>
</template>

<script>
export default {
  name: 'BaseInfo',

  props: {
    title: String,
    dark: Boolean
  },

  data: () => ({
    business: [
      {
        icon: 'mdi-map-marker-outline',
        title: 'Address',
        text: '8553 N. Beach St. Ste. 227<br>Fort Worth, Texas 76137'
      },
      {
        icon: 'mdi-cellphone',
        title: 'Phone',
        text: '01 (800) 433 744<br>01 (800) 433 633'
      },
      {
        icon: 'mdi-email',
        title: 'Email',
        text: 'john@vuetifyjs.com<br>heather@vuetifyjs.com'
      }
    ]
  })
}
</script>
<style scoped>
.v-image__image .v-image__image--cover{
  background-size:unset ;
}
</style>