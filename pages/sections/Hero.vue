<template>
  <section id="hero" class="hero mt-n25">
    <div class="overlay" />
    <div class="poster">
      <video
        autoplay
        loop
        style="background-image:url('/img/5dff9887dcc8ad72956ca626_video-poster-00001.jpg')"
        muted
        playsinline
        data-wf-ignore="true"
        data-object-fit="cover"
      >
        <source src="/video/background.mp4" data-wf-ignore="true">
        <source src="/video/background.webm" data-wf-ignore="true">
      </video>

      <v-container class="fill-height px-4 py-12">
        <v-responsive class="d-flex align-center" height="100%" max-width="700" width="100%">
          <base-heading :title="$t('home_page.hero_title')" />
          <div  class="white--text">
            {{ $t('home_page.hero_description') }}
          </div>

          <div
            :class="$vuetify.breakpoint.smAndDown ? 'flex-column align-start' : 'align-center'"
            class="d-flex flex-wrap mt-4"
          >
            <base-btn :to="'register'">
              {{ $t('home_page.try_it') }}
            </base-btn>
          </div>
        </v-responsive>
      </v-container>
    </div>
  </section>
</template>

<script>
export default {
  name: 'SectionHero',

  provide: {
    theme: { isDark: true }
  },

  computed: {
    minHeight () {
      const height = this.$vuetify.breakpoint.mdAndUp ? '100vh' : '50vh'
      return `calc(${height} - ${this.$vuetify.application.top}px)`
    }
  }
}
</script>
<style scoped>
.mba-4{
      margin-top: 16px !important;
}
.hero {
  background-color: rgba(4, 25, 44, 0.76);
}
.poster {
  position: relative;
  background-color: black;
  height: 75vh;
  min-height: 25rem;
  width: 100%;
  overflow: hidden;
  background-color: rgba(4, 25, 44, 0.76);
}
.poster video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);

  background-image: linear-gradient(
    to right,
    rgba(5, 11, 31, 0.8),
    rgba(5, 11, 31, 0.8)
  );
  opacity: 0.5;
  z-index: 1;
}

.poster .container {
  position: relative;
  z-index: 2;
}
</style>
