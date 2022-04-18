<template>
  <v-btn rounded text @click="setLocale()">
    <v-icon size="18">mdi-web</v-icon>
    <span class="ml-2">{{ locale === "en" ? `EN-RU` : `RU-EN` }}</span>
  </v-btn>
  <!-- <v-menu bottom left class="z-ind">
    <template v-slot:activator="{ on, attrs }">
      <v-btn dark v-bind="attrs" v-on="on" outlined>
        {{ locales[locale] }}
        <v-icon>mdi-web</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item
        v-for="(value, key) in locales"
        :key="key"
        @click.prevent="setLocale(key)"
      >
        <v-list-item-title>{{ value }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu> -->
</template>

<script>
import { mapGetters } from "vuex";
import { loadMessages } from "~/plugins/i18n";

export default {
  computed: mapGetters({
    locale: "lang/locale",
    locales: "lang/locales",
  }),

  methods: {
    setLocale() {
      const newLocale = this.locale === "en" || null || undefined ? "ru" : `en`;
      loadMessages(newLocale);
      this.$store.dispatch("lang/setLocale", { locale: newLocale });

      // if (this.$i18n.locale !== locale) {
      //   loadMessages(locale);

      //   this.$store.dispatch("lang/setLocale", { locale });
      // }
    },
  },
};
</script>
<style lang="scss" scoped>
.z-ind {
  z-index: 9999999;
}
</style>
