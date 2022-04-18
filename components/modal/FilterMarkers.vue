<template>
  <!-- <v-dialog width="384" hide-overlay v-model="isOpen" background="white"> -->
  <v-card class="pa-1 ma-0" elevation="0" v-if="isOpen">
    <v-select
      dense
      item-text="abbr"
      item-value="value"
      class="mt-3 mb-3"
      hide-details
      v-model="filterMarkerOptions.status"
      :items="pin_status"
      outlined
      :label="$t(`pin.status`)"
    >
      <template v-slot:selection="data">
        {{ $t("pin." + data.item.abbr) }}
      </template>
      <template v-slot:item="data">
        {{ $t("pin." + data.item.abbr) }}
      </template>
    </v-select>
    <v-select
      dense
      v-model="filterMarkerOptions.type"
      :items="pin_types"
      item-text="abbr"
      item-value="value"
      class="mt-3 mb-3"
      hide-details
      outlined
      :label="$t(`pin.type`)"
    >
      <template v-slot:selection="data">
        <v-img
          v-if="data.item.value !== null"
          :lazy-src="`../${data.item.abbr}--red.svg`"
          max-height="20"
          max-width="20"
          contain
          :src="`../${data.item.abbr}--red.svg`"
        >
        </v-img>
        {{ $t("pin." + data.item.abbr) }}
      </template>
      <template v-slot:item="data">
        <v-img
          v-if="data.item.value !== null"
          :lazy-src="`../${data.item.abbr}--red.svg`"
          max-height="25"
          max-width="25"
          contain
          :src="`../${data.item.abbr}--red.svg`"
        >
        </v-img>
        {{ $t("pin." + data.item.abbr) }}
      </template>
    </v-select>
  </v-card>
  <!-- </v-dialog> -->
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      filterMarkerOptions: {
        type: null,
        status: null,
      },
      pin_status: [
        { abbr: "clear", value: null },
        { abbr: "status_true", value: "true" },
        { abbr: "status_false", value: "false" },
      ],
      pin_types: [
        { abbr: "clear", value: null },
        { abbr: "shop", value: "shop" },
        { abbr: "store", value: "store" },
        { abbr: "pub_catering", value: "pub_catering" },
      ],
    };
  },
  watch: {
    "filterMarkerOptions.type": async function (newVal, previousVal) {
      if (newVal === previousVal) {
        return;
      }
      await this.$store.dispatch(
        `map/setFilterOptions`,
        this.filterMarkerOptions
      );
    },
    "filterMarkerOptions.status": async function (newVal, previousVal) {
      if (newVal === previousVal) {
        return;
      }

      await this.$store.dispatch(
        `map/setFilterOptions`,
        this.filterMarkerOptions
      );
    },
  },
};
</script>

<style></style>
