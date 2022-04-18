<template>
  <div class="sidebar-container">
    <preload :end="modalLoading" :opacity="1" />

    <div
      :class="sidebar_IsHide ? `sidebar-hide` : `sidebar-view`"
      class="sidebar-main"
    >
      <div class="sidebar-main__header">
        <div
          v-if="
            stepper === 0 &&
            user &&
            (user.role == `partner` || user.role == `admin`)
          "
          class="pl-4 pr-4 pt-4 pb-1"
        >
          <h3>{{ $t("pin.company_points") }}</h3>
          <p class="gray-text font-14 ma-0">
            {{ $t("pin.points_on_company") }}
          </p>
        </div>
        <div
          v-if="stepper === 0 && user && user.role == 'user'"
          class="pl-4 pr-4 pt-4 pb-1"
        >
          <h3>{{ $t("pin.where_deliver") }}</h3>
          <p class="gray-text font-14 ma-0">
            {{ $t("pin.where_deliver_subtext") }}
          </p>
        </div>
        <div v-if="stepper == 1" class="pl-4 pr-4 pt-4 pb-1">
          <v-row no-gutters align="center">
            <v-btn @click="stepper = 0" icon color="red">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <h3 class="ma-0 font-w500">
              {{ !editId ? $t("pin.add_point") : $t("pin.edit_point") }}
            </h3>
          </v-row>
        </div>
        <div v-if="stepper == 2" class="pl-4 pr-4 pt-4 pb-1">
          <v-row no-gutters align="center">
            <v-btn @click="stepper = 0" icon color="red">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-row>
        </div>
      </div>

      <div
        :class="
          $store.state.auth.role === `user` ? `scroll_user` : `scroll_partner`
        "
        class="scroll pa-2"
      >
        <v-row>
          <v-col cols="10">
            <v-btn
              class="mb-1 pa-0 text-capitalize font-weight-regular"
              text
              block
              @click="myPosition"
            >
              <v-icon color="red">mdi-map-marker-outline</v-icon>
              <div
                style="color: rgba(255, 0, 19, 0.44)"
                class="underline-btn font-weight-bold"
              >
                {{ $t("pin.my_geoposition") }}
              </div>
            </v-btn>
          </v-col>
          <v-col cols="2">
            <v-btn
              transition="scale-transition"
              icon
              @click="isOpenFilters = !isOpenFilters"
            >
              <v-icon>{{
                isOpenFilters ? `mdi-filter` : `mdi-filter-outline`
              }}</v-icon>
            </v-btn></v-col
          >
        </v-row>
        <v-scale-transition>
          <filter-markers
            :isOpen="isOpenFilters"
            @setFilter="(v) => (filterMarkerOptions = v)"
          />
        </v-scale-transition>

        <v-scroll-x-reverse-transition>
          <minic v-if="stepper === 1" :editId="editId" @exit="stepper = 0" />
          <pointinfo
            v-else-if="stepper === 2"
            :editId="editId"
            @edit="(v, v2) => editPointById(v, v2)"
          />
          <res-null v-else @edit="(v, v2) => editPointById(v, v2)" />
        </v-scroll-x-reverse-transition>
      </div>

      <div
        v-if="stepper === 0 && (user.role == `partner` || user.role == `admin`)"
        :class="
          $vuetify.breakpoint.width <= 768
            ? `sidebar-view__footer2_1`
            : `sidebar-view__footer2`
        "
      >
        <v-btn
          @click="stepper === 0 ? (stepper = 1) : (stepper = 0)"
          elevation="5"
          height="40"
          style="font-weight: 500 !important"
          class="white--text text-capitalize font-weight-bold"
          block
          color="#FF0013"
          >{{ $t("pin.add_point") }}</v-btn
        >
      </div>
    </div>

    <!-- <div
      class="sidebar-toggle-button"
      @click="
        sidebar_IsHide ? (sidebar_IsHide = false) : (sidebar_IsHide = true)
      "
    > 
      <v-icon size="30">
        {{
          sidebar_IsHide
            ? "mdi-arrow-left-drop-circle"
            : "mdi-arrow-right-drop-circle"
        }}</v-icon
      >
    </div> -->
  </div>
</template>

<script>
import minic from "@/components/LeftBar/add";
import resultnull from "@/components/LeftBar/result-null";
import preload from "@/components/LoadingBar";
import pointinfo from "@/components/LeftBar/point-info";
import FilterMarkers from "@/components/modal/FilterMarkers";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      stepper: 0,
      isOpenFilters: false,
      sidebar_IsHide: false,
      sidebar_destroyed: false,
      editId: null,
      loading: false,
      filterMarkerOptions: null,
      style_width_cont: "384px",
      //   handleScroll: null,
    };
  },
  computed: mapGetters({
    modalLoading: "map/modalLoading",
    openPointOnTheMap: "map/openPointOnTheMap",
    user: "auth/user",
  }),
  components: {
    minic: minic,
    "res-null": resultnull,
    "filter-markers": FilterMarkers,
    preload,
    pointinfo,
  },
  watch: {
    sidebar_IsHide: function (val) {
      if (!val) {
        setTimeout(() => {
          this.sidebar_destroyed = false;
          console.log(123);
        }, 100);
      } else {
        this.sidebar_destroyed = true;
      }
    },
    openPointOnTheMap: function (Newval, oldVal) {
      console.log(123);
      // if (!Newval) return this.$store.dispatch(`map/SetPointOnTheMap`, null);
      if (!Newval) return;
      console.log("123", Newval);
      if (Newval === this.editId && this.stepper === 2) return;
      console.log("maaaadara", Newval, this.editId);
      this.editPointById(Newval, 2);
      // this.$store.dispatch(`map/SetPointOnTheMap`, null);
    },
    stepper: function (val) {
      if (val === 0) {
        this.editId = null;
      }
    },
  },

  methods: {
    editPointById(id, stopperNumber) {
      this.editId = id;
      this.stepper = stopperNumber;
    },
    async myPosition() {
      await this.$store.dispatch(`map/goToMyGeoLocation`, true);
    },
  },
};
</script>

<style>
@media screen and (min-width: 768px) {
  :root {
    --width-cont: 384px;
  }
}
@media screen and (max-width: 768px) {
  :root {
    --width-cont: 100%;
  }
}
</style>

<style lang="scss" scoped>
.gray-text {
  color: #7f7f7f;
}
.font-14 {
  font-size: 14px;
}
.font-w500 {
  font-weight: 500 !important;
}
.sidebar-container {
  position: relative !important;
}
.sidebar-hide {
  -webkit-transform: translateX(-384px);
  transform: translateX(-384px);
  opacity: 0;
  visibility: hidden;
  -webkit-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
    width 0.1s ease-in-out, -webkit-transform 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
    width 0.1s ease-in-out, -webkit-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out, width 0.1s ease-in-out;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out, width 0.1s ease-in-out,
    -webkit-transform 0.2s ease-in-out;
}
.sidebar-main {
  // position: absolute;
  z-index: 200;
  top: 0;
  left: 0;
  bottom: 0px;
  -webkit-transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
    width 0.1s ease-in-out, -webkit-transform 0.2s ease-in-out;
  transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out,
    width 0.1s ease-in-out, -webkit-transform 0.2s ease-in-out;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out, width 0.1s ease-in-out;
  transition: transform 0.2s ease-in-out, opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out, width 0.1s ease-in-out,
    -webkit-transform 0.2s ease-in-out;
  background-color: white;
  box-shadow: 2px 0 2px 0 rgb(0 0 0 / 10%);
  width: var(--width-cont);
  &__header {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  }
}
.sidebar-view {
  opacity: 1;
}
.text-center {
  text-align: center;
  max-width: 95%;
}

.sidebar-view__footer2 {
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 24px;
  z-index: 3;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  //   background-color: red;

  width: var(--width-cont);
}
.sidebar-view__footer2_1 {
  position: sticky;
  bottom: 80px;
  left: 0;
  padding: 24px;
  z-index: 3;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  //   background-color: red;

  width: var(--width-cont);
}
// SCROLL
.scroll {
  display: block;
  height: 100%;
  width: var(--width-cont);
  overflow-y: auto;
  position: relative;
}
.scroll_partner {
  height: calc(100vh - 224px);
}
.scroll_user {
  height: calc(100vh - 140px);
}
.scroll::-webkit-scrollbar {
  width: 20px;
}

.scroll::-webkit-scrollbar-track {
  background-color: transparent;
}

.scroll::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

.scroll::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
// END SCROLL
.sidebar-view._shown {
  -webkit-transform: none;
  transform: none;
  opacity: 1;
  visibility: visible;
}
.sidebar-toggle-button {
  position: absolute;
  z-index: 500;
  min-width: 24px;
  height: 32px;
  margin-top: 16px;
  margin-left: 392px;
  border-radius: 4px;
  color: #fff;
  background-color: var(--color-background-suggest);
  box-shadow: 0 2px var(--shadow-blur) 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  -webkit-flex-shrink: 0;
  flex-shrink: 0;
  pointer-events: auto;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-transition: margin-left 0.1s ease-in-out;
  transition: margin-left 0.1s ease-in-out;
}
</style>
