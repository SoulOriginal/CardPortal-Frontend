<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card
        :title="$t('home_page.keep_in_touch.title')"
        pace="6"
      >
        {{ $t('home_page.keep_in_touch.description') }}
      </base-info-card>

      <base-business-contact dense />
    </div>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'BaseBusinessInfo',
    props: { dark: Boolean }
  }
</script>
