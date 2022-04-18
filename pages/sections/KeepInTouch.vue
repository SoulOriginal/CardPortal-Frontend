<template>
  <base-section
    id="info-alt"
    space="56"
  >
    <v-container>
      <v-row justify="space-between">
        <v-col
          cols="12"
          md="5"
        >
          <base-business-info :title="$t('home_page.keep_in_touch.title')">
            {{ $t('home_page.keep_in_touch.description') }}
          </base-business-info>
        </v-col>

        <v-col
          cols="12"
          md="6"
        >
          <base-contact-form :title="$t('home_page.keep_in_touch.mail_us')" />
        </v-col>
      </v-row>
    </v-container>
  </base-section>
</template>

<script>
  export default {
    name: 'SectionKeepInTouch'
  }
</script>
