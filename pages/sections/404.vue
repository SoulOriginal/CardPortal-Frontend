<template>
  <base-section id="404">
    <base-heading v-if="error.statusCode === 404" title="404" />
    <!--<base-heading v-else title="500" />-->

    <base-subheading class="primary--text" title="OOPS!" />

    <base-subheading
      space="6"
      v-if="error.statusCode === 404"
      title="Looks like this page doesn't exist."
    />
    <!--<base-subheading space="6" v-else title="Server error. Please try again later." />-->

    <base-img :src="'/images/logo.png'" class="mx-auto mb-2" contain height="250" width="180" />

    <div class="text-center">
      <base-btn :to="{ name: 'home' }">Go home</base-btn>
    </div>
  </base-section>
</template>

<script>
export default {
  props: ["error"],
  name: "FourOhFour",

  provide: {
    heading: { align: "center" },
  },
};
</script>
