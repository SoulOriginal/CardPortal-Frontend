<template>
  <v-footer id="home-footer" color="black mt-0" dark min-height="72">
    <v-container>
      <v-col cols="12">
        <base-img src="logo-white.png" contain width="120" />
      </v-col>
      <v-col>
        <v-col cols="12"
          ><v-btn
            @click="$vuetify.goTo(`#main2`)"
            class="text-capitalize font-weight-regular"
            text
            >Предложения</v-btn
          >
        </v-col>
        <v-col cols="12"
          ><v-btn
            @click="$vuetify.goTo(`#main3`)"
            class="text-capitalize font-weight-regular"
            text
            >Кто мы?</v-btn
          >
        </v-col>
      </v-col>
      <v-row>
        <v-col cols="12" md="4">
          <div
            class="d-flex flex-wrap justify-md-start justify-center justify-md-none"
          >
            <template v-for="(s, i) in socials">
              <v-btn text tile :key="i">
                <a :key="i" :href="s.link" target="_blank">
                  <v-icon :color="s.color">{{ s.icon }}</v-icon>
                </a>
              </v-btn>

              <!-- <v-responsive
                :key="`divider-${s.name}`"
                class="mx-4 shrink hidden-sm-and-down"
                max-height="24"
              >
                <v-divider vertical />
              </v-responsive> -->
            </template>
          </div>
        </v-col>
        <v-col
          cols="12"
          md="3"
          class="d-flex flex-wrap justify-md-start justify-center justify-md-none"
        >
          <LocaleDropdown />
          <!-- <v-btn
            link
            @click="$vuetify.goTo(`#main5`)"
            class="text-capitalize font-weight-regular"
            text
            rounded
          >
            <v-icon>mdi-map-marker</v-icon>
            Warszawa
          </v-btn> -->
        </v-col>

        <v-col class="text-center text-md-right" cols="12" md="5">
          Copyright &copy; {{ $moment().format("YYYY") }} HM CardPortal ®
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
import LocaleDropdown from "@/components/LocaleDropdown";
export default {
  name: "HomeFooter",
  components: {
    LocaleDropdown,
  },
  data: () => ({}),
  computed: {
    socials() {
      return [
        {
          icon: "mdi-facebook",
          link: "/",
          color: "white",
        },
        {
          icon: "mdi-instagram",
          link: "/",
          color: "white",
        },
        {
          icon: "mdi-youtube",
          link: "/",
          color: "white",
        },
        {
          icon: "mdi-linkedin",
          link: "/",
          color: "white",
        },
      ];
    },
  },
};
</script>

<style lang="sass">
#home-footer a
  text-decoration: none
</style>
