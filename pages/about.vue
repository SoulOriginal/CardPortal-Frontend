<template>
  <div>
    <div class="hero-carousel">
      <v-carousel
        interval="6500"
        cycle
        progress
        continuous
        auto-height
        touchless
        :show-arrows="false"
        hide-delimiters
      >
        <v-carousel-item
          v-for="(item, i) in 12"
          :key="i"
          :src="`getman-imges/` + i + `.jpg`"
        >
        </v-carousel-item>
      </v-carousel>
      <v-card class="hero-carousel__window carousel-window pa-7" elevation="4">
        <h3>Kim jesteśmy?</h3>
        <h4 style="display: list-item" class="mt-3">
          Zarejestrowana w Polsce handlowa marka
          <span class="text--red red--text">GETMAN</span>
        </h4>
        <h4 style="display: list-item" class="mt-3">
          Producent wysokiej jakości mrożonych półproduktów Chinkali i Pielmieni
        </h4>
      </v-card>
    </div>

    <InfoFeatures />
    <SelectProfile />
    <geomap :itsIndex="true" style="z-index: 0" />
    <!-- <preload :start="preloader" :animation="animation" /> -->
  </div>
</template>

<script>
import geomap from "@/components/geomap";
import SelectProfile from "@/components/SelectProfile";
import InfoFeatures from "@/components/InfoFeatures";
import Preload from "@/components/LoadingBar";

export default {
  layout: "home",
  // loading: false,
  data() {
    return {
      items: [
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/sky.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/bird.jpg",
        },
        {
          src: "https://cdn.vuetifyjs.com/images/carousel/planet.jpg",
        },
      ],
      model: 0,
      overlay_val: false,
      preloader: true,
      animation: false,
    };
  },
  created() {
    setInterval(() => {
      this.animation = true;
      setInterval(() => {
        this.preloader = false;
      }, 800);
    }, 1100);
  },
  components: {
    geomap,
    SelectProfile,
    InfoFeatures,
    preload: Preload,
  },
};
</script>

<style lang="scss" scoped>
.hero-carousel {
  position: relative;

  @media (max-width: 1264px) {
    padding-top: 157px;
  }
  @media (max-width: 960px) {
    padding-top: 157px;
  }
}
.vue-typer {
  font-size: 24px;
  font-weight: 600;
}

.btns-hero {
  padding: 31px 16px !important;

  // font-size: 44px;
  letter-spacing: normal;
  font-family: system-ui, "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.carousel-window {
  max-width: 60%;
  background: white;
  padding: 15px;
  // width: 570px;
  width: 450px;
  position: absolute;
  left: 10%;
  top: 10%;
  transition: all 200ms;
  border-radius: 10px;
  display: flex;
  height: 286px;
  flex-direction: column;
  // @media (max-width: 768px) {
  //   position: absolute;
  //   left: 50%;
  //   transform: translate(-50%, 0);
  // }

  @media (max-width: 1264px) {
    transition: all 200ms;
    top: 0;
    left: 0;
    right: 0;
    height: max-content;
    max-width: 100%;
    width: 100%;
    display: flex;

    border-radius: unset;
    .spasebeatwen {
      justify-content: space-between;
    }
  }
  @media (max-width: 960px) {
    height: max-content;
  }
}
</style>
