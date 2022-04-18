<template lang="html">
  <v-overlay
    :class="animation ? `fadeOut` : `fadeIn`"
    v-if="visible"
    :opacity="opacity"
    color="#ffffff"
    value="1"
    absolute
    :z-index="500"
  >
    <v-img
      v-if="!onlySpinner"
      lazy-src="../dark2.png"
      max-height="33"
      max-width="250"
      contain
      src="../dark2.png"
      class="mb-5"
    >
    </v-img>
    <breeding-rhombus-spinner
      :animation-duration="2000"
      :size="size"
      color="#ff1d5e"
    />
  </v-overlay>
</template>

<script>
import "epic-spinners/dist/lib/epic-spinners.min.css";
import { BreedingRhombusSpinner } from "epic-spinners/dist/lib/epic-spinners.min.js";
export default {
  props: {
    start: Boolean,
    end: Boolean,
    opacity: {
      type: [Number, String],
      default: 1,
    },
    size: {
      default: 65,
    },
    onlySpinner: {
      default: false,
    },
  },

  watch: {
    end: {
      handler(val) {
        console.log(val);
        if (val) {
          this.animation = false;
          this.visible = true;
        } else {
          this.animation = true;
          setTimeout(() => {
            this.visible = false;
          }, 800);
        }
      },
      immediate: true,
    },
  },
  components: {
    BreedingRhombusSpinner,
  },
  data() {
    return {
      animation: false,
      visible: false,
    };
  },
  // methods: {
  //   start() {
  //     this.loading = true;
  //     this.overlay = true;
  //   },
  //   finish() {
  //     this.animation = true;
  //     setInterval(() => {
  //       this.loading = false;
  //       this.overlay = false;
  //     }, 800);
  //   },
  // },
};
</script>
<style lang="scss">
.v-overlay__content {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.mt-5 {
  margin-top: 17px;
}

.fadeIn {
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeIn;
  animation-name: fadeIn;
}
@-webkit-keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.fadeOut {
  -webkit-animation-duration: 0.8s;
  animation-duration: 0.8s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-name: fadeOut;
  animation-name: fadeOut;
}
@-webkit-keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
