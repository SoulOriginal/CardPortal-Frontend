<template>
  <div>
    <base-info-card
      :title="title"
      :subtitle="subtitle"
      space="4"
      color="primary"
    />

    <base-text-field :label="$t('home_page.keep_in_touch.name')" />

    <base-text-field :label="$t('home_page.keep_in_touch.your_email')" />

    <base-text-field :label="$t('home_page.keep_in_touch.subject')" />

    <base-textarea
      class="mb-6"
      :label="$t('home_page.keep_in_touch.message')"
    />

    <base-btn
      :color="!theme.isDark ? 'accent' : 'white'"
      href="mailto:shop@vuetifyjs.com?subject=Zero%20Theme%20Question"
      outlined
      target="_blank"
    >
      {{ $t('home_page.keep_in_touch.send') }}
    </base-btn>
  </div>
</template>

<script>
  export default {
    name: 'BaseContactForm',

    // Injected from the Vuetify Themeable mixin
    inject: ['theme'],

    props: {
      subtitle: String,
      title: {
        type: String,
        default: 'MAIL US YOUR MESSAGE'
      }
    }
  }
</script>
