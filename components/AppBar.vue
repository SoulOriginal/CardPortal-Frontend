<template>
  <div>
    <v-app-bar
      id="home-app-bar"
      app
      dark
      elevation="1"
      class="appstyle"
      height="64"
    >
      <nuxt-link to="/">
        <base-img src="logo-white.png" class="ml-5 mr-2" contain width="120" />
      </nuxt-link>
      <!-- <v-menu @input="input_menu" offset-y class="hidden-sm-and-down">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-3 text-capitalize font-weight-regulars hidden-sm-and-down"
            rounded
            dark
            color="transparent"
            v-bind="attrs"
            v-on="on"
          >
            {{ $t("company") }}
            <v-icon size="20">
              {{ bar_arrow ? `mdi-chevron-up` : `mdi-chevron-down` }}</v-icon
            >
          </v-btn>
        </template>
        <v-list class="pa-0">
          <v-list-item
            class="pa-0"
            v-for="(item, index) in menu_items"
            :key="index"
          >
            <v-list-item
              nuxt
              :to="item.route"
              dense
              ripple
              class="cursor-pointer hover-color"
            >
              <v-list-item-content>
                <v-list-item-title
                  v-text="item.title"
                ></v-list-item-title> </v-list-item-content
            ></v-list-item>
          </v-list-item>
        </v-list>
      </v-menu> -->
      <v-spacer />
      <LocaleDropdown />
      <!-- <div>
        <v-tabs
          class="hidden-sm-and-down mr-1"
          optional
          height="36"
          slider-size="0"
          background-color="transparent"
        >
          <v-tab
            v-for="(item, i) in links"
            :key="i"
            :to="item.route"
            :exact="item.route === $nuxt.$route.name"
            :ripple="true"
            :class="item.color ? `colored-btn` : ''"
            class="text-sm-body-2 text-capitalize font-weight-regular rounded-pill"
            min-width="96"
            text
          >
            {{ item.title }}
          </v-tab>
          <v-tab
            class="text-capitalize font-weight-regular"
            v-if="user"
            :to="'/' + user.role"
          >
            {{ $t("profile") }}
          </v-tab>
          <v-tab
            class="black--white text-sm-body-2 text-capitalize font-weight-regular rounded-pill"
            v-if="!user"
            @click="overlay_val = !overlay_val"
          >
            {{ $t("login") }}
          </v-tab>
          <v-tab
            class="colored-btn text-sm-body-2 text-capitalize font-weight-regular rounded-pill white"
            v-if="!user"
            @click="overlay_val = !overlay_val"
          >
            {{ $t("register") }}
          </v-tab>
        </v-tabs>
      </div> -->
      <v-btn
        class="text-capitalize font-weight-regular"
        v-if="user"
        :to="'/' + user.role"
      >
        {{ $t("profile") }}
      </v-btn>
      <v-btn
        text
        to="login"
        class="black--white text-sm-body-2 text-capitalize font-weight-regular rounded-pill"
        v-if="!user"
      >
        {{ $t("login") }}
      </v-btn>
      <v-btn
        class="colored-btn text-sm-body-2 text-capitalize font-weight-regular rounded-pill white"
        v-if="!user"
        to="register"
      >
        {{ $t("register") }}
      </v-btn>

      <v-app-bar-nav-icon class="hidden-md-and-up" @click="drawer = !drawer" />
    </v-app-bar>

    <home-drawer v-model="drawer" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "HomeAppBar",
  components: {
    HomeDrawer: () => import("./Drawer"),
    LocaleDropdown: () => import("~/components/LocaleDropdown"),
  },

  data: () => ({
    drawer: null,
    overlay_val: false,
    bar_arrow: false,
  }),
  methods: {
    lol() {
      this.$forceUpdate();
    },
    input_menu(event) {
      this.bar_arrow = event;
    },
  },
  async mounted() {
    await this.$nextTick();
    this.$nextTick(() => {
      console.log(this.user);
    });
  },
  computed: {
    links() {
      let a = [
        // {
        //   title: this.$t("home"),
        //   route: "/",
        // },
        // {
        //   title: this.$t("security"),
        //   route: "/seamen/security",
        // },
        // {
        //   title: this.$t("leftbar.guide"),
        //   route: "/seamen/guide",
        // },
      ];
      if (!this.user) {
        a.push({
          title: this.$t("login"),
          route: "login",
          color: true,
        });
      }
      return a;
    },
    menu_items() {
      return [
        {
          title: this.$t("pin.about_company"),
          route: "/about",
        },
        {
          title: this.$t("pin.me_products"),
          route: "/products",
        },
        {
          title: this.$t("pin.security"),
          route: "/security",
        },
        {
          title: this.$t("pin.history_company"),
          route: "/history",
        },
      ];
    },
    ...mapGetters({
      user: "auth/user",
      chekUser: "auth/check",
    }),
  },
};
</script>
<style scoped>
>>> #home-app-bar {
  z-index: 2;
  background-color: #000000 !important;
  /* max-width: calc(1408px); */
}

>>> .v-toolbar__content {
  max-width: calc(1408px) !important;
  margin: 0 auto;
}

>>> .v-list {
  margin-top: 15px;
}
>>> .colored-btn {
  margin-left: 5px;
  color: rgb(0, 0, 0) !important;
}
>>> .overlay-cont {
  /* width: 205vh;
  height: 87vh; */
  width: 100vw;
  height: 100vh;
  margin-top: 125px;
}
>>> .overlay-close-btn {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
>>> .cursor-pointer:hover {
  cursor: pointer;
}
>>> .hover-color:hover {
  background-color: #f6f6f6 !important;
}
</style>
