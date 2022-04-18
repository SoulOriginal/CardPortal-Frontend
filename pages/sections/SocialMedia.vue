<template>
  <v-theme-provider dark>
    <base-section
      id="social"
      class="accent text-center"
      space="56"
    >
      <base-icon class="mb-8">
        mdi-twitter
      </base-icon>

      <base-section-heading
        color="white"
        style="color:white"
        title="Social Media"
      >
      <div  style="color:white"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis qui ipsam deserunt deleniti minima nemo iste dicta temporibus exercitationem! Maiores veritatis, ad odit porro consequuntur eius optio. Ab, deserunt error. </div>
      </base-section-heading>

      <a
        class="d-inline-block mb-8"
        href="https://vuetifyjs.com"
        style="text-decoration: none;"
        target="_blank"
      >
        https://vuetifyjs.com
      </a>

      <div class="py-4" />

      <v-btn
        color="white"
        href="https://twitter.com/vuetifyjs"
        light
        min-width="168"
        target="_blank"
        large
        outlined
      >
        Follow Us 

        <v-icon right>
          mdi-open-in-new
        </v-icon>
        
      </v-btn>
    </base-section>
  </v-theme-provider>
</template>

<script>
  export default {
    name: 'SectionNews',

    provide: {
      heading: { align: 'center' },
    },
  }
</script>
