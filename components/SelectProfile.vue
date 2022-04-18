<template>
  <div>
    <v-card
      :class="$vuetify.breakpoint.width < 600 ? `pt-8 pb-8 pl-2 pr-2` : `pa-8`"
    >
      <v-row no-gutters>
        <v-col
          cols="12"
          sm="6"
          lg="6"
          md="6"
          class="d-flex justify-center pl-1 pr-1"
        >
          <v-btn
            @click="overlay_val = !overlay_val"
            elevation="0"
            text
            tile
            block
            class="text-capitalize btns-hero underline-btn"
            style="font-size: 20px"
            >{{ $t("pin.become_our") }}
            <div class="red--text ml-1">{{ $t("pin.client") }}</div>
            <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn
          >
        </v-col>

        <v-col
          cols="12"
          sm="6"
          lg="6"
          md="6"
          class="d-flex justify-center pl-1 pr-1"
        >
          <v-btn
            @click="overlay_val = !overlay_val"
            size="33"
            elevation="0"
            text
            block
            tile
            class="text-capitalize btns-hero underline-btn"
            style="font-size: 20px"
            >{{ $t("pin.become_our") }}
            <div class="red--text ml-1">{{ $t("pin.partner") }}</div>
            <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn
          >
        </v-col>
      </v-row>
    </v-card>
    <overlayProfile :overlay_val="overlay_val" @exit="overlay_val = false" />
  </div>
</template>

<script>
import overlayProfile from "@/components/overlayProfile";
export default {
  data() {
    return {
      overlay_val: false,
    };
  },
  components: {
    overlayProfile,
  },
};
</script>

<style lang="scss" scoped>
.overlay-cont {
  width: 100vw;
  height: 100vh;
  margin-top: 125px;
}
.overlay-close-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.cursor-pointer:hover {
  cursor: pointer;
}
.hover-color:hover {
  background-color: #f6f6f6 !important;
}
</style>
