<template>
  <v-theme-provider dark>
    <base-section
      id="contact-us"
      class="primary"
      space="40"
    >
      <v-container>
        <v-row justify="center">
          <v-col cols="10">
            <base-title
              :space="$vuetify.breakpoint.mdAndUp ? 0 : 4"
              :title="$t('home_page.contact_us.title')"
            />

            <base-body space="0">
              <span class="white--text">
                {{ $t('home_page.contact_us.description') }}
              </span>
            </base-body>
          </v-col>

          <v-col
            cols="12"
            md="2"
          >
            <base-btn
              :block="$vuetify.breakpoint.smAndDown"
              color="white"
              href="mailto:info@oneclickmarine.com"
              large
              outlined
              target="_blank"
            >
              {{ $t('home_page.contact_us.button') }}
            </base-btn>
          </v-col>
        </v-row>
      </v-container>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'SectionContactUs'
  }
</script>
