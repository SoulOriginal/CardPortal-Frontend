<template>
  <v-app>
    <toast-container></toast-container>
    <v-main class="bg-black">
      <home-app-bar />
      <FlyIcons />
      <v-fade-transition mode="out-in">
        <nuxt style="z-index: 1" />
      </v-fade-transition>
    </v-main>

    <home-footer />
  </v-app>
</template>

<script>
export default {
  name: "HomeLayout",
  components: {
    HomeAppBar: () => import("~/components/AppBar"),
    FlyIcons: () => import("~/components/bacground-icons-fly"),
    HomeFooter: () => import("~/components/Footer"),
  },
  async beforeCreate() {
    console.log(123123);
    await this.$store.dispatch("auth/fetchUser");
  },
};
</script>
<style>
.bg-black {
  background-color: black;
}
</style>
