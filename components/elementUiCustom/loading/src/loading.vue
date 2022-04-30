<template>
  <transition name="loading-fade" @after-leave="handleAfterLeave">
    <div class="el-loading-custom" v-show="visible">
      <div class="el-loading-custom__list">
        <breeding-rhombus-spinner
          :animation-duration="2000"
          :size="size"
          color="#ff1d5e"
        />
      </div>
    </div>
  </transition>
</template>

<script>
import "epic-spinners/dist/lib/epic-spinners.min.css";
import { BreedingRhombusSpinner } from "epic-spinners/dist/lib/epic-spinners.min.js";

export default {
  components: {
    BreedingRhombusSpinner,
  },
  data() {
    return {
      text: null,
      spinner: null,
      background: null,
      fullscreen: true,
      visible: false,
      customClass: "",
      size: {
        default: 65,
      },
    };
  },

  methods: {
    handleAfterLeave() {
      this.$emit("after-leave");
    },
    setText(text) {
      this.text = text;
    },
  },
};
</script>

<style lang="scss">
.loading-fade-enter,
.loading-fade-leave-active {
  opacity: 0;
}

.el-loading-custom {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  justify-content: center;
  font-size: 15px;
  background-color: rgba(255, 255, 255, 0.97);
  margin: 0;
  transition: opacity 0.3s;
  z-index: 2000;

  &__list {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 80vh;
    height: 100%;
  }
}
</style>
