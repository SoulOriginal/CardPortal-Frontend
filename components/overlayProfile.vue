<template>
  <v-overlay :value="overlay_val" color="white" opacity="1" z-index="1">
    <div class="overlay-cont">
      <v-row no-gutters>
        <v-col cols="12" sm="12" md="12" lg="4">
          <v-card
            :class="$vuetify.breakpoint.name == `md` ? `pa-2  ` : `pa-0 `"
            :style="
              $vuetify.breakpoint.height < 1265 ? `    height: 100vh;  ` : null
            "
            height="100%"
            elevation="0"
            class="rounded-0"
          >
            <v-row no-gutters>
              <v-col cols="12" class="pl-1 pr-1">
                <v-col cols="12">
                  <v-btn icon @click="$emit('exit')"
                    ><v-icon>mdi-close</v-icon></v-btn
                  ></v-col
                >

                <v-btn
                  :to="{ name: `login` }"
                  height="65"
                  elevation="0"
                  text
                  tile
                  block
                  :style="
                    $vuetify.breakpoint.height < 960
                      ? `font-size: 15px`
                      : `font-size: 20px`
                  "
                  class="text-capitalize btns-hero underline-btn"
                >
                  {{ $t("login") }}
                  <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn
                >
              </v-col>

              <v-col cols="12" class="d-flex justify-center pl-1 pr-1">
                <v-btn
                  :to="{ name: `auth.user` }"
                  height="65"
                  size="33"
                  elevation="0"
                  text
                  block
                  tile
                  :style="
                    $vuetify.breakpoint.height < 960
                      ? `font-size: 15px`
                      : `font-size: 20px`
                  "
                  class="text-capitalize btns-hero underline-btn"
                  >{{ $t("register_user") }}
                  <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn
                >
              </v-col>
              <v-col cols="12" class="d-flex justify-center pl-1 pr-1">
                <v-btn
                  :to="{ name: `auth.partner` }"
                  height="65"
                  size="33"
                  elevation="0"
                  text
                  block
                  tile
                  :style="
                    $vuetify.breakpoint.height < 960
                      ? `font-size: 15px`
                      : `font-size: 20px`
                  "
                  class="text-capitalize btns-hero underline-btn"
                  >{{ $t("register_partnter") }}
                  <v-icon class="ml-2">mdi-arrow-right</v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
        <v-col cols="8" v-if="$vuetify.breakpoint.width >= 1264">
          <v-carousel
            interval="6500"
            cycle
            continuous
            touchless
            height="100vh"
            :show-arrows="false"
            hide-delimiters
            reverse-transition="fade-transition"
            transition="fade-transition"
          >
            <v-carousel-item
              v-for="(item, i) in 12"
              :src="`../getman-imges/` + i + `.jpg`"
              :key="i"
            >
            </v-carousel-item> </v-carousel
        ></v-col>
      </v-row>
    </div>
  </v-overlay>
</template>

<script>
export default {
  props: {
    overlay_val: {
      type: Boolean,
      default: false,
    },
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
