<template>
  <v-app>
    <toast-container></toast-container>
    <v-row no-gutters justify="center">
      <v-col
        sm="0"
        md="7"
        lg="7"
        v-if="$vuetify.breakpoint.width >= 1040"
        class="layout__illustration"
        height="100%"
      >
        <ClientOnly placeholder="...">
          <gsapGlassCard v-if="isMounted" />
        </ClientOnly>
      </v-col>
      <v-col
        cols="12"
        sm="12"
        md="5"
        lg="5"
        height="100%"
        class="pa-4 position-relative"
      >
        <v-row no-gutters>
          <v-btn absolute icon @click="$router.go(-1)" color="red" class="pa-3">
            <v-icon large width="27" height="27" color="red">mdi-close</v-icon>
          </v-btn>
          <div class="d-flex justify-center mb-4" style="width: 100%">
            <v-img
              lazy-src="/svg/logo/light_mini.svg"
              max-height="36"
              max-width="68"
              contain
              src="/svg/logo/light_mini.svg"
            >
            </v-img>
          </div>
        </v-row>
        <v-container class="pa-0 ma-0" fluid fill-height>
          <nuxt />
        </v-container>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import gsapGlassCard from "@/components/gsapGlassCard";
export default {
  name: "auth",
  data() {
    return {
      isMounted: false,
    };
  },
  mounted() {
    this.isMounted = true;
  },
  components: {
    gsapGlassCard: gsapGlassCard,
  },
};
</script>
<style lang="scss">
.login {
  &__social-networks {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 10px;
    gap: 10px;
  }
}
.grid-four {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  gap: 10px;
}
.login-container {
  max-width: 360px;
  margin: 0 auto;

  @media (min-width: 1200px) {
    max-width: 400px;
  }
}
.an-separator {
  height: 1.125rem;
  display: flex;
  width: 100%;
  align-items: center;
  &__line {
    height: 1px;
    background-color: #434648;
    width: 100%;
    flex-shrink: 1;
  }
  &__text {
    color: #434648;
    font-size: 0.875rem;
    line-height: 1.125rem;
    flex-shrink: 0;
    padding: 0 10px;
    font-weight: 700;
  }
}
// html {
//   // overflow: auto;
// }
.v-stepper__wrapper {
  height: 100%;
}
.abs-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
}
.bck {
  color: #3e454c !important;
}
@media (max-width: 1040px) {
  .layout__illustration {
    display: none;
  }
}
.btns-margin-r {
  margin-left: 16px;
}
.gray900 {
  color: --ion-color-gray25;
  fill: red;
}
.v-stepper__content {
  padding: unset !important;
}
</style>
