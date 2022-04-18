<template>
  <div class="main-partner-container">
    <bottom-sheet v-model="sheetState" v-if="$vuetify.breakpoint.width <= 768">
      <left-bar />
    </bottom-sheet>
    <left-bar v-if="$vuetify.breakpoint.width > 768" />
    <geomap></geomap>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import leftbar from "@/components/LeftBar/index";
import geomap from "@/components/geomap";
import BottomSheet from "@/components/BottomSheet";
export default {
  layout: "profile",
  computed: mapGetters({
    user: "auth/user",
  }),

  data() {
    return {
      sheetState: "open",
    };
  },
  components: {
    "left-bar": leftbar,
    geomap,
    BottomSheet,
  },
  async beforeMount() {
    this.$store.dispatch("auth/fetchUser");
  },
};
</script>
<style>
@media screen and (min-width: 768px) {
  :root {
    --width-cont: 384px;
  }
}
@media screen and (max-width: 768px) {
  :root {
    --width-cont: 100%;
  }
}
</style>
<style lang="scss" scoped>
.main-partner-container {
  width: 100%;
  height: 100%;
  position: relative;
  // position: absolute;
  display: flex;
  max-width: 100%;
  max-height: 100%;
}
.main-partner-container2 {
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
}
</style>
