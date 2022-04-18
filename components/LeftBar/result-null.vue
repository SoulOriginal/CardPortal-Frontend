<template>
  <div style="position: relative; width: 100%; height: 100%">
    <div v-if="!points" class="null-content">
      <v-img
        lazy-src="./VectorLogo.svg"
        max-height="163"
        height="163"
        max-width="165"
        width="165"
        contain
        src="./VectorLogo.svg"
      />

      <p
        class="mt-5 mb-0 font-w500 gray-text text-center"
        v-if="user && user.role"
      >
        {{ $t(`pin.${user.role}_not_points`) }}
      </p>
      <p class="text-center gray-text font-14" v-if="user && user.role">
        {{ $t(`pin.${user.role}_not_points_subtext`) }}
      </p>
    </div>
    <v-list v-if="points" two-line>
      <v-list-item-group>
        <template v-for="(item, index) in pointsList">
          <v-list-item
            :key="index + `_item`"
            class="ma-0 pa-0"
            @click.prevent="
              role === 'user' ? $emit(`edit`, item._id, 2) : null;
              goToSimpleLocation(
                item.location.coordinates,
                getIconName(item.pin_type, item.pin_status)
              );
            "
          >
            <template v-slot:default>
              <v-list-item-content>
                <v-list-item-title>
                  <h4 class="mb-2 d-flex">
                    {{ item.custom_name ? item.name : item.config_name.name }}
                    <div
                      class="gray-text font-14 d-flex align-center ml-1"
                      v-if="item.distance"
                    >
                      • {{ parseInt(item.distance) }} m
                    </div>
                  </h4></v-list-item-title
                >

                <v-list-item-subtitle class="wsbs gray-text"
                  ><h5>{{ item.address.string }}</h5></v-list-item-subtitle
                >

                <v-list-item-subtitle>
                  <v-row no-gutters align="center">
                    <v-img
                      width="24"
                      max-width="24"
                      max-height="24"
                      height="24"
                      class="mr-1"
                      :alt="item.name"
                      :src="getIconName(item.pin_type, item.pin_status)"
                    ></v-img>
                    <h5>
                      {{ $t(`pin.${item.pin_type}`) }} •
                      {{ $t(`pin.status_${item.pin_status}`) }}
                    </h5>
                  </v-row>
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-action v-if="role === 'partner' || role === 'admin'">
                <v-btn
                  height="42"
                  width="42"
                  min-width="42"
                  color="rgba(0, 0, 0, 0.08)"
                  class="mr-3 pa-0"
                  elevation="0"
                  @click="$emit(`edit`, item._id, 1)"
                >
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </v-list-item-action>
            </template>
          </v-list-item>
          <v-divider :key="index + `_divider`"></v-divider>
        </template>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      notResults: false,
      pointsList: null,
      role: null,
    };
  },

  computed: {
    ...mapGetters({
      points: "map/points",
      user: "auth/user",
    }),
  },
  created() {
    this.getAccountInformation();
  },
  watch: {
    user: {
      handler(newVal) {
        if (newVal) {
          this.getAccountInformation();
        }
      },
      immediate: true,
    },
    points: {
      handler(newVal) {
        if (!newVal) {
          return;
        }
        this.pointsList = { ...newVal };
      },
      immediate: true,
    },
  },
  methods: {
    getIconName(typePoint, statusPoint) {
      this.loading = true;
      return `/${typePoint}--${statusPoint ? "red" : "gray"}.svg`;
    },
    goToSimpleLocation(bounds, icon) {
      this.$store.dispatch("map/UpdateSimpleLocation", {
        value: {
          loc: bounds,
          icon,
          onlyPan: false,
        },
      });
    },
    async getAccountInformation() {
      await this.user;
      console.log("rrr", this.$store.state.auth.role);
      console.log(123);
      this.role = this.$store.state.auth.role;

      if (this.role == "partner") {
        await this.$store.dispatch("map/fetchPoints");
      }
      if (this.role == "admin") {
        console.log("sk", this.user._id);
        await this.$store.dispatch("map/fetchPointsByID", this.user._id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.null-content {
  width: 100%;
  height: 100%;
  display: flex;
  align-content: center;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.gray-text {
  color: #7f7f7f;
}
.font-14 {
  font-size: 14px;
}
.font-w500 {
  font-weight: 500 !important;
}
.wsbs {
  white-space: break-spaces;
}
</style>
