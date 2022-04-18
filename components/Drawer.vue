<template>
  <v-navigation-drawer fixed temporary v-bind="$attrs" v-on="$listeners">
    <v-list>
      <v-list-item
        v-for="item in links"
        :key="item.title"
        :to="{ name: item.route }"
        :exact="item.route === $nuxt.$route.name"
        color="primary"
      >
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "HomeDrawer",

  props: {
    items: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    links() {
      let a = [
        {
          title: this.$t("home"),
          route: "home",
        },
      ];
      if (!this.user) {
        a.push({
          title: this.$t("login"),
          route: "login",
        });
        a.push({
          title: this.$t("register"),
          route: "auth.user",
        });
      } else {
        a.push({
          title: this.$t("profile"),
          route: this.user.role,
        });
      }
      return a;
    },
    ...mapGetters({
      user: "auth/user",
    }),
  },
};
</script>
