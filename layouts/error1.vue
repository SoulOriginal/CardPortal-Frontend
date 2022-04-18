<template>
  <v-app>
    <v-container fill-height>
      <v-row justify="center" align="center">
        <v-col cols="12" sm="4">
          <v-card class="pa-4" elevation="10">
            <div
              class="text-center pa-4 text-uppercase font-weight-black display-3"
            >
              OOPS
            </div>
            <h1 class="text-center" v-if="error.statusCode === 404">
              {{ pageNotFound }}
            </h1>
            <h1 class="text-center" v-else>
              {{ otherError }}
            </h1>
            <v-btn
              text
              tile
              block
              @click="$router.push('/')"
              class="underline-btn"
              >Home page</v-btn
            >
            <v-btn text tile block @click="$router.go(-1)" class="underline-btn"
              >One Step Back</v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
export default {
  layout: "empty",
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: "404 Not Found",
      otherError: "An error occurred",
    };
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
