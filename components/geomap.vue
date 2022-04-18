<template>
  <div
    v-if="mapPoints !== null"
    :style="$vuetify.breakpoint.width <= 768 ? 'left: 0 !important;' : ''"
    :id="itsIndex ? `map-wrap__index_page` : `map-wrap`"
  >
    <l-map
      ref="mapElement"
      :zoom="zoom"
      :center="mapCenter"
      @ready="onReady"
      @locationfound="onLocationFound"
      @locationerror="onlocationeEror"
      :options="{
        zoomControl: true,
        updateWhenZooming: false,
        updateWhenIdle: true,
        preferCanvas: true,
        scrollWheelZoom: true,
        minZoom: 6,
        maxZoom: 18,
        gestureHandling: itsIndex,
        gestureHandlingOptions: gestureHandlingOptions,
      }"
    >
      <l-tile-layer
        url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
      ></l-tile-layer>
      <l-control-fullscreen
        position="topleft"
        :options="{ title: { false: 'Open', true: 'Close' } }"
      />
      <l-control
        :position="$vuetify.breakpoint.width <= 768 ? `topright` : `bottomleft`"
      >
        <div class="white">
          <v-row align="center" class="pa-1">
            <v-img
              height="24"
              width="24"
              :src="getIconName('shop', true)"
            ></v-img>
            <p class="pa-0 ma-0">- {{ $t("pin.status_true") }}</p>
            <v-img
              class="ml-1"
              height="24"
              width="24"
              :src="getIconName('shop', false)"
            ></v-img>
            <p class="pa-0 ma-0">- {{ $t("pin.status_false") }}</p>
          </v-row>
        </div>
      </l-control>
      <!-- <l-marker
        v-if="location"
        :icon="icon"
        :lat-lng="[location.y, location.x]"
      ></l-marker>
                <!-- <l-tooltip :options="{ direction: `top`, opacity: 1 }">
            {{ item }}
            <!-- <div class="hw-defoult">
              <preload
                :onlySpinner="true"
                :size="30"
                :end="true"
                :opacity="1"
              />
            </div> 
          </l-tooltip> -->
      <!-- <l-popup>Hello!</l-popup> -->
      <!-- <l-control-layers ref="control"></l-control-layers>
      <l-tile-layer
        :url="url"
        :attribution="attribution"
        name="base"
        layer-type="base"
      ></l-tile-layer> -->
      <!-- <l-layer-group layer-type="overlay" name="Sources" :visible="true">
        <l-marker
          v-for="marker in markers"
          :key="marker.id"
          :visible="marker.visible"
          :lat-lng="marker.position"
        />
      </l-layer-group> -->

      <l-marker v-if="geolocation" :lat-lng="geolocation"></l-marker>
      <l-marker v-if="simpleLocation.onlyPan" :lat-lng="simpleLocation.loc">
        <l-icon
          :icon-size="[48, 48]"
          :icon-anchor="[24, 24]"
          :icon-url="`${simpleLocation.icon}`"
        >
        </l-icon>
      </l-marker>
      <v-marker-cluster ref="clusterRef" :options="MarkerClusterOptions">
        <l-marker
          v-for="(item, index) in mapPoints"
          :key="index"
          :lat-lng="item.location.coordinates"
          @click="onPointClick(item._id)"
          :visible="markersSort(item.pin_type, item.pin_status)"
        >
          <l-icon
            :className="
              item._id == openPointOnTheMap ? `g-marker-icon--active` : null
            "
            :icon-size="[38, 38]"
            :icon-anchor="[22, 22]"
            :icon-url="getIconName(item.pin_type, item.pin_status)"
          >
          </l-icon>
        </l-marker>
      </v-marker-cluster>
    </l-map>
  </div>
</template>

<script>
import { OpenStreetMapProvider } from "leaflet-geosearch";
// import * as L1 from "leaflet.markercluster";
// import "leaflet.markercluster/dist/MarkerCluster.Default.css";
// import "leaflet/dist/leaflet.css";
// import "leaflet.markercluster/dist/MarkerCluster.css";

import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet/dist/leaflet.css";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
import preload from "@/components/LoadingBar";
import { mapGetters } from "vuex";
import LControlFullscreen from "vue2-leaflet-fullscreen";

// setup
const provider = new OpenStreetMapProvider();
import "leaflet.markercluster.layersupport";
import { icon } from "leaflet";
export default {
  data() {
    return {
      map: null,
      mapClusters: null,
      zoom: 15,

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
      MarkerClusterOptions: {
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        chunkedLoading: true,
        removeOutsideVisibleBounds: true,
        spiderfyDistanceMultiplier: 3,
        maxClusterRadius: 160,
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 18,
      },
      mapCenter: [51.9189046, 19.1343786],
      location: null,
      geolocation: null,
      simpleClickPoint: null,
      url: "http://{s}.tile.osm.org/{z}/{x}/{y}.png",

      gestureHandlingOptions: {
        duration: 1000,
        text: {
          touch: this.$t("pin.map_touch"),
          scroll: this.$t("pin.map_scroll"),
          scrollMac: this.$t("pin.map_scrollMac"),
        },
      },
      icon: icon({
        iconUrl: "pub_catering--gray.svg",
        iconSize: [48, 48],
        iconAnchor: [24, 24],
      }),
    };
  },

  async fetch() {
    await this.$store.dispatch(`map/fetchMapPoints`);
  },
  fetchOnServer: true,

  props: {
    itsIndex: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    "v-marker-cluster": Vue2LeafletMarkerCluster,
    preload,
    LControlFullscreen,
  },
  computed: mapGetters({
    simpleLocation: "map/simpleLocation",
    user: "auth/user",
    points: "map/points",
    mapPoints: "map/mapPoints",
    goToMyGeoLocation: "map/goToMyGeoLocation",
    openPointOnTheMap: "map/openPointOnTheMap",
    filterOptions: "map/filterOptions",
  }),

  methods: {
    async onReady() {
      this.map = this.$refs["mapElement"].mapObject;
      this.mapClusters = this.$refs["clusterRef"].mapObject;
      // var mcgLayerSupportGroup = this.mapClusters.layerSupport();
      // mcgLayerSupportGroup.addTo(this.map);
      // console.log(123, this.mapClusters);
      this.$store.dispatch(`map/goToMyGeoLocation`, true);
    },
    markersSort(type, status) {
      status = status.toString();
      if (!this.filterOptions) return true;
      if (!this.filterOptions.type && !this.filterOptions.status) {
        return true;
      }
      if (
        this.filterOptions.type !== null &&
        this.filterOptions.status !== null
      ) {
        if (
          type == this.filterOptions.type &&
          status == this.filterOptions.status
        ) {
          return true;
        }
      } else {
        if (type == this.filterOptions.type) {
          return true;
        }
        if (status == this.filterOptions.status) {
          return true;
        }
      }

      return false;
    },
    async onPointClick(point_id) {
      // if (this.itsIndex) return;
      this.simpleClickPoint = point_id;
      console.log("async onPointClick", point_id);
      await this.$store.dispatch(`map/SetPointOnTheMap`, point_id);
    },
    async getAccountInformation() {
      if (this.user && this.user.role === "partner") {
        var { data } = await this.$axios.get("/profile/B2B");
        this.pointsList = data;
      }
    },
    async onLocationFound(locationLoc) {
      if (!locationLoc) return;
      await this.map.flyTo(
        [locationLoc.latlng.lat, locationLoc.latlng.lng],
        16,
        { animate: true, duration: 1.5 }
      );

      this.geolocation = [locationLoc.latlng.lat, locationLoc.latlng.lng];

      console.log("loc faund");
      if (this.user.role == "admin") return;
      if (this.user.role !== "partner") return;

      try {
        const { data } = await this.$axios.post(`/profile/B2C/near`, {
          location: [locationLoc.latlng.lat, locationLoc.latlng.lng],
        });
        this.$store.dispatch(`map/updatePoints`, data);
      } catch (error) {
        console.log(error.message);
      }

      // this.$nextTick(async () => {
      // await this.map.panTo([locationLoc.latlng.lat, locationLoc.latlng.lng]);

      // var LocalEditedPoints = new Array();
      // for (const [key, value] of Object.entries(this.points)) {
      //   console.log(`${key}: ${value.address.bounds}`);

      //   const distanseUPointToUser = await this.map.distance(
      //     [locationLoc.latlng.lat, locationLoc.latlng.lng],
      //     value.address.bounds
      //   );
      //   LocalEditedPoints.push({ ...value, distanse: distanseUPointToUser });
      // }
      // console.log(LocalEditedPoints);
      // await this.$store.dispatch(`map/updatePoints`, LocalEditedPoints);
      // } else {
      //   if (locationLoc) {
      //     this.geolocation = [locationLoc.latlng.lat, locationLoc.latlng.lng];
      //   }
      // }
      // console.log(this.map.getCenter());
    },
    onlocationeEror() {
      return this.$vueOnToast.pop("error", this.$t("pin.error_locate_user"));
    },

    getIconName(typePoint, statusPoint) {
      return `/${typePoint}--${statusPoint ? "red" : "gray"}.svg`;
    },
  },

  watch: {
    async simpleLocation(val, oldVal) {
      if (val === oldVal) {
        return;
      }
      console.warn("xuita jest", val);
      // await this.MarkerClusterGroup.refreshClusters();
      // await this.spawnMarkers();
      // await this.MarkerClusterGroup.refreshClusters();
      await this.map.flyTo(val.loc, 17, { animate: true, duration: 1.5 });
      // this.map.setZoom(16);
      // this.map.panTo(val.loc);
    },
    async goToMyGeoLocation(val) {
      if (val) {
        this.map.locate({
          setView: false,
          watch: false,
          timeout: 10000,
          maximumAge: 200,
          enableHighAccuracy: true,
        });
        await this.$store.dispatch("map/goToMyGeoLocation", false);
      }
    },
    user: {
      handler(newVal) {
        if (newVal) {
          this.getAccountInformation();
        }
      },
      immediate: false,
    },
  },
};
</script>

<style lang="scss">
@import "leaflet.markercluster/dist/MarkerCluster.css";
@import "leaflet.markercluster/dist/MarkerCluster.Default.css";
.g-marker-icon--active {
  // margin: 10px;
  background: #fdfdfd;
  border-radius: 50%;
}
.g-marker-icon {
}
#map-wrap {
  width: 100%;
  height: 100%;
  /* float: right; */
  // position: absolute;
  // right: 0;
  // bottom: 0;
  // left: 384px;
  z-index: 10;
}
#map-wrap__index_page {
  position: relative;
  height: 600px;
}
.cluster-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--primary);
  border-radius: 50%;
  box-shadow: 0 0 0 3px rgba(48, 72, 107, 0.3);
  color: var(--white);
  font-size: 1em;
  font-weight: bold;
}
.hw-defoult {
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
