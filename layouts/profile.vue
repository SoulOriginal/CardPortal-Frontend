<template>
  <v-app id="inspire">
    <toast-container></toast-container>
    <v-navigation-drawer
      id="default-drawer"
      v-model="drawer"
      :right="$vuetify.rtl"
      :mini-variant="mini"
      mini-variant-width="80"
      app
      color="rgb(54, 54, 54)"
      width="260"
    >
      <template #img="props">
        <v-img
          :gradient="`rgba(0, 0, 0, .7), rgba(0, 0, 0, .7)`"
          v-bind="props"
        />
      </template>

      <div class="px-2" @click="mini = false">
        <v-list-item class="mb-0 justify-space-between pl-3">
          <v-img lazy-src="1.svg" src="1.svg" />
          <v-list-item-content class="pl-2">
            <v-list-item-title class="text-h5 white--text">
              <strong class="mr-1 font-weight-black">CardPortal</strong>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mx-3 mb-2 red" />
        <v-list expand nav v-bind="$attrs" v-on="$listeners">
          <template v-for="(item, i) in items">
            <v-list-item
              :key="`group-${i}`"
              exact-path
              :href="item.href"
              :rel="item.href ? 'nofollow' : undefined"
              :target="item.href ? '_blank' : undefined"
              :to="{ name: item.to }"
              active-class="red white--text"
              link
              class="py-1 white--text"
              v-bind="$attrs"
              v-on="$listeners"
            >
              <v-list-item-icon
                v-if="!item.icon"
                color="white"
                class="text-caption text-uppercase justify-center ml-1 my-2 align-self-center"
              >
              </v-list-item-icon>

              <v-list-item-avatar v-if="item.avatar">
                <v-img :src="item.avatar" />
              </v-list-item-avatar>

              <v-list-item-icon v-if="item.icon" class="my-2 align-self-center">
                <v-icon color="white" v-text="item.icon" />
              </v-list-item-icon>

              <v-list-item-content v-if="item.title">
                <v-list-item-title v-text="$t(`global.layout.${item.title}`)" />
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list>
      </div>
    </v-navigation-drawer>
    <preload :onlySpinner="!user" :size="60" :end="!user" :opacity="1" />
    <v-main v-if="user">
      <vue-bottom-sheet
        v-if="$vuetify.breakpoint.width <= 960"
        ref="myBottomSheet"
        :swipe-able="true"
        :background-scrollable="false"
        :overlay="true"
        max-height="50%"
      >
        <div class="bottom-sheet__container pa-3">
          <v-list expand nav v-bind="$attrs" v-on="$listeners">
            <template v-for="(item, i) in items">
              <v-list-item
                :key="`group_two-${i}`"
                exact-path
                :href="item.href"
                :rel="item.href ? 'nofollow' : undefined"
                :target="item.href ? '_blank' : undefined"
                :to="{ name: item.to }"
                active-class="red white--text "
                class="py-1 dark_my white--text"
                link
                v-bind="$attrs"
                v-on="$listeners"
              >
                <v-list-item-icon
                  v-if="!item.icon"
                  color="white"
                  class="text-caption text-uppercase justify-center ml-1 my-2 align-self-center"
                >
                </v-list-item-icon>

                <v-list-item-icon
                  v-if="item.icon"
                  class="my-2 align-self-center"
                >
                  <v-icon color="white" v-text="item.icon" />
                </v-list-item-icon>

                <v-list-item-content v-if="item.title">
                  <v-list-item-title
                    v-text="$t(`global.layout.${item.title}`)"
                  />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>
        </div>
      </vue-bottom-sheet>
      <v-container fluid>
        <v-app-bar
          id="default-app-bar"
          app
          color="transparent"
          :clipped-left="$vuetify.rtl"
          :clipped-right="!$vuetify.rtl"
          height="50"
          flat
        >
          <v-btn
            class="ml-3 mr-4"
            elevation="1"
            fab
            small
            @click="handlerChangeViewUserBar()"
          >
            <v-icon>
              {{ mini ? "mdi-format-list-bulleted" : "mdi-dots-vertical" }}
            </v-icon>
          </v-btn>
          <v-chip outlined color="orange"
            >{{ balance }} {{ balance_сurrency }}</v-chip
          >
          <v-spacer />
          <v-btn
            height="42"
            width="42"
            min-width="42"
            color="rgba(255, 255, 255, 0.2)"
            class="pa-0"
            @click="dialog = true"
          >
            <v-icon color="black">mdi-account-outline </v-icon>
          </v-btn>

          <LocaleDropdown />
        </v-app-bar>
        <nuxt />
      </v-container>
    </v-main>
    <v-dialog class="lalala" v-model="dialog" width="230">
      <v-card>
        <v-btn block @click.prevent="logout">{{ $t("logout") }}</v-btn>
        <v-divider></v-divider>
        <v-btn block :to="{ name: 'settings' }">{{ $t("settings") }}</v-btn>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import preload from "@/components/LoadingBar";
import { mapGetters } from "vuex";
import { loadMessages } from "~/plugins/i18n";
export default {
  middleware: "go-home",
  // components: {
  //   VueBottomSheet,
  // },
  data: ({ context, app }) => ({
    dialog: false,
    drawer: true,
    mini: true,
    nomini: false,
    appName: process.env.appName,

    items: [
      {
        title: "products",
        icon: "mdi-view-dashboard",
        to: "user",
      },
      {
        title: "orders",
        icon: "mdi-cart-check",
        to: "orders",
      },
      {
        title: "history",
        icon: "mdi-clipboard-text-clock",
        to: "orders.history",
      },
    ],
  }),
  components: {
    preload,
    LocaleDropdown: () => import("~/components/LocaleDropdown"),
  },
  computed: mapGetters({
    locale: "lang/locale",
    locales: "lang/locales",
    user: "auth/user",
    balance: "auth/balance",
    balance_сurrency: "auth/balance_сurrency",
  }),
  async beforeCreate() {
    await this.$store.dispatch("auth/fetchUser");
  },
  methods: {
    open() {
      this.$refs.myBottomSheet.open();
    },
    close() {
      this.$refs.myBottomSheet.close();
    },
    handlerChangeViewUserBar() {
      if (this.$vuetify.breakpoint.width <= 960) {
        this.open();
      } else {
        this.mini = !this.mini;
      }
    },
    setLocale(locale) {
      if (this.$i18n.locale !== locale) {
        loadMessages(locale);

        this.$store.dispatch("lang/setLocale", { locale });
      }
    },
    async logout() {
      // Log out the user.
      await this.$store.dispatch("auth/logout");

      // Redirect to login.
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style lang="sass" scoped>
#default-drawer
  .v-list-item
    margin-bottom: 8px

  .v-list-item::before,
  .v-list-item::after
    display: none

  .v-list-group__header__prepend-icon,
  .v-list-item__icon
    margin-top: 12px
    margin-bottom: 12px
    margin-left: 4px

  &.v-navigation-drawer--mini-variant
    .v-list-item
      justify-content: flex-start !important
.v-dialog__content
        align-items: center
        display: flex
        height: unset
        justify-content: center
        left: unset
        pointer-events: none
        position: fixed
        top: 40px
        right: 0
        transition: 0.2s cubic-bezier(0.25, 0.8, 0.25, 1), z-index 1
        width: unset
        z-index: 6
        outline: none
.dark_my
  background-color: #000000
</style>
