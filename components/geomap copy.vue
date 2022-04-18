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
      <l-marker v-if="geolocation" :lat-lng="geolocation"></l-marker> -->
      <!-- <l-marker v-if="geolocation" :lat-lng="geolocation"></l-marker> -->
      <l-marker v-if="simpleLocation.onlyPan" :lat-lng="simpleLocation.loc">
        <l-icon
          :icon-size="[48, 48]"
          :icon-anchor="[24, 24]"
          :icon-url="`${simpleLocation.icon}`"
        >
        </l-icon>
      </l-marker>
      <!-- <l-marker
        v-for="(item, index) in mapPoints"
        :key="index"
        :lat-lng="item.location.coordinates"
        class="abc"
        @click="onPointClick(item._id)"
      >
        <!-- <l-tooltip>{{ item.pin_type }}{{ item.pin_status }}!</l-tooltip> -->
      <!-- <l-icon
          :className="item._id == openPointOnTheMap ? `abc` : null"
          :icon-size="[48, 48]"
          :icon-anchor="[24, 24]"
          :icon-url="getIconName(item.pin_type, item.pin_status)"
        >
        </l-icon> 
      </l-marker> -->
    </l-map>
  </div>
</template>

<script>
import { OpenStreetMapProvider } from "leaflet-geosearch";
import * as L1 from "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import { GestureHandling } from "leaflet-gesture-handling";
import "leaflet-gesture-handling/dist/leaflet-gesture-handling.css";
import "leaflet/dist/leaflet.css";
import { mapGetters } from "vuex";
// setup
const provider = new OpenStreetMapProvider();
import { icon } from "leaflet";
export default {
  data() {
    return {
      map: null,
      zoom: 15,
      MarkerClusterGroup: new L1.MarkerClusterGroup({
        showCoverageOnHover: false,
        zoomToBoundsOnClick: true,
        chunkedLoading: true,
        removeOutsideVisibleBounds: true,
        spiderfyDistanceMultiplier: 3,
        maxClusterRadius: 160,
        spiderfyOnMaxZoom: false,
        disableClusteringAtZoom: 18,
      }),
      mapCenter: [51.9189046, 19.1343786],
      location: null,
      geolocation: null,
      simpleClickPoint: null,
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
  computed: mapGetters({
    simpleLocation: "map/simpleLocation",
    user: "auth/user",
    points: "map/points",
    mapPoints: "map/mapPoints",
    goToMyGeoLocation: "map/goToMyGeoLocation",
    openPointOnTheMap: "map/openPointOnTheMap",
  }),

  methods: {
    async onReady() {
      this.map = this.$refs["mapElement"].mapObject;
      this.$store.dispatch(`map/goToMyGeoLocation`, true);
      this.spawnMarkers();
      // var markers = this.$L.markerClusterGroup();

      this.MarkerClusterGroup.on("click", (event) => {
        // markers._icon.addClass("selectedMarker");
        // console.log(event);
        // var RedIcon = new this.$L.icon({
        //   iconUrl: "store--red.svg",
        // });
        // this.$L.divIcon({
        //   className: "g-marker-icon",
        // });
        // event.layer.setIcon(
        //   new marker_icon_a({
        //     iconUrl: "store--red.svg",
        //   })
        // );
        // markers.setIcon(
        //   new marker_icon_a({
        //     iconUrl: "store--red.svg",
        //   })
        // );
        // console.log(markers);

        this.onPointClick(event.sourceTarget.database_id);
      });
      // markers.bindPopup("No data yet, please wait...");
      var customPopup = "<b>My office</b><br/>";

      // specify popup options
      var customOptions = {
        // sticky: true,
        // permanent: true,
        direction: "top",
        maxWidth: "400",
        width: "200",

        className: "popupCustom",
      };

      // markers.bindTooltip(customPopup, customOptions);
      // markers.bindPopup(customPopup, customOptions);
      this.MarkerClusterGroup.on("mouseover", async (event) => {
        // var loading = true;
        // var popup = this.$L
        //   .popup()
        //   .setLatLng([event.latlng.lat, event.latlng.lng])
        //   .setContent("Loading on")
        //   .openOn(this.map);
        // const { data } = await this.$axios.get(
        //   `profile/B2B?id_point=${event.sourceTarget.database_id}&user_information=true`
        // );
        // popup.setContent(`${data.config_name.name}`);
        // markers.popupOpen();
        // markers._icon.addClass("selectedMarker");
        // event.target._popup._content = 123;
        // console.log(event);
      });

      // [50.8941977, 20.66416238053001]
      //[50.89464945, 20.663146020789195] [50.8944546, 20.66285284057171] [50.885978050000006, 20.641626496500404] [50.89464945, 20.663146020789195]
    },
    async spawnMarkers() {
      // await this.map.removeLayer(this.MarkerClusterGroup);

      await this.map.eachLayer(async (layer) => {
        if (layer instanceof L1.MarkerClusterGroup) {
          await this.map.removeLayer(layer);
        }
      });

      var marker_icon = this.$L.Icon.extend({
        options: {
          className: "g-marker-icon",
          iconSize: [38, 38],
          shadowSize: [50, 64],
          iconAnchor: [22, 22],
          shadowAnchor: [4, 62],
          popupAnchor: [0, -176],
        },
      });
      for (const key in this.mapPoints) {
        if (Object.hasOwnProperty.call(this.mapPoints, key)) {
          console.log(1);
          const element = this.mapPoints[key];
          var greenIcon = new marker_icon({
            iconUrl: this.getIconName(element.pin_type, element.pin_status),
          });
          var some_marker = this.$L.marker(element.location.coordinates, {
            icon: greenIcon,
          });
          this.MarkerClusterGroup.addLayer(some_marker);
          some_marker.database_id = element._id;
        }
      }
      // this.mapPoints.forEach((item) => {
      //   var marker = L.marker(item.coordinates, {
      //     icon: L.divIcon({
      //       html: `<div><span>1</span></div>`,
      //       className: "leaflet-div-icon",
      //     }),
      //   });

      // markers.addLayer(marker);
      // });
      await this.map.addLayer(this.MarkerClusterGroup);
      // await this.MarkerClusterGroup.refreshClusters();
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
      console.log("loc faund");
      if (this.user && this.user.role !== "partner") {
        try {
          const { data } = await this.$axios.post(`/profile/B2C/near`, {
            location: [locationLoc.latlng.lat, locationLoc.latlng.lng],
          });
          this.$store.dispatch(`map/updatePoints`, data);
        } catch (error) {
          console.log(error.message);
        }
      }

      // this.$nextTick(async () => {
      // await this.map.panTo([locationLoc.latlng.lat, locationLoc.latlng.lng]);
      await this.map.flyTo(
        [locationLoc.latlng.lat, locationLoc.latlng.lng],
        16,
        { animate: true, duration: 1.5 }
      );
      // });
      if (locationLoc) {
        this.geolocation = [locationLoc.latlng.lat, locationLoc.latlng.lng];
      }

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
      await this.map.flyTo(val.loc, 16, { animate: true, duration: 1.5 });
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
    mapPoints: {
      async handler(newVal) {
        if (newVal && this.map) {
          console.log("newVal", newVal);
          await this.spawnMarkers();
        }
      },
      immediate: false,
    },
  },
};
</script>

<style lang="scss">
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
</style>
