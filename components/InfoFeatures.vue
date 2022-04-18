<template>
  <v-col cols="11" style="margin: 0 auto">
    <v-row no-gutters>
      <v-col cols="12" md="6" lg="4" class="mt-3">
        <v-icon color="#000000" size="44">mdi-account-supervisor</v-icon>
        <h4>{{ $t("pin.about_company") }}</h4>
        <h5 class="mt-2 font-weight-regular text-md-body-1">
          {{ $t("pin.about_company_info") }}
        </h5>
        <v-btn
          to="/about"
          class="text-capitalize font-weight-regular underline-btn mt-6"
          text
          tile
          :block="$vuetify.breakpoint.width <= 960"
        >
          {{ $t("pin.more") }}
        </v-btn>
      </v-col>
      <v-col cols="12" md="6" lg="4" class="mt-3">
        <v-icon color="#000000" size="44">mdi-food-drumstick</v-icon>
        <h4>{{ $t("pin.me_products") }}</h4>
        <h5 class="mt-2 font-weight-regular text-md-body-1">
          {{ $t("pin.about_products") }}
        </h5>
        <v-btn
          to="/products"
          class="text-capitalize font-weight-regular underline-btn mt-6"
          text
          tile
          :block="$vuetify.breakpoint.width <= 960"
        >
          {{ $t("pin.more") }}
        </v-btn>
      </v-col>
      <v-col cols="12" md="12" lg="4" class="mt-3">
        <v-icon color="#000000" size="44">mdi-security</v-icon>
        <h4>{{ $t("pin.security") }}</h4>
        <h5 class="mt-2 font-weight-regular text-md-body-1">
          {{ $t("pin.security__info") }}
        </h5>
        <v-btn
          to="/security"
          class="text-capitalize font-weight-regular underline-btn mt-6"
          text
          tile
          :block="$vuetify.breakpoint.width <= 960"
        >
          {{ $t("pin.more") }}
        </v-btn>
      </v-col>
    </v-row>
  </v-col>
</template>

<script>
export default {
  name: "SectionFeaturesAlt",
  data: () => ({}),
};
</script>
