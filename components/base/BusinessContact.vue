<template>
  <v-theme-provider :dark="dark">
    <div>
      <base-info-card
        :title="title"
        color="primary"
      >
        <slot />
      </base-info-card>
      <template v-for="({ icon, text, title: t }, i) in business">
        <base-avatar-card
          :key="i"
          :icon="icon"
          :outlined="false"
          :title="!dense ? t : undefined"
          color="transparent"
          horizontal
          space="0"
        >
          <!-- Do not use v-html for user -->
          <!-- provided values -->
          <div class="mt-6" v-text="text" />
        </base-avatar-card>

        <v-divider
          v-if="i + 1 !== business.length"
          :key="`divider-${i}`"
          class="my-1"
        />
      </template>
    </div>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'BaseBusinessContact',

    props: {
      dark: Boolean,
      dense: Boolean,
      title: String
    },
    computed: {
      business () {
        return [
          {
            icon: 'mdi-map-marker-outline',
            title: 'Address',
            text: this.$t('home_page.keep_in_touch.address')
          },
          {
            icon: 'mdi-cellphone',
            title: 'Phone',
            text: this.$t('home_page.keep_in_touch.phone')
          },
          {
            icon: 'mdi-email',
            title: 'Email',
            text: this.$t('home_page.keep_in_touch.email')
          }
        ]
      }
    }
  }
</script>
