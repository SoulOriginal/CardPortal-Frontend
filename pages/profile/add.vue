<template>
  <v-card elevation="0" v-observe-visibility="visibilityChanged">
    <ValidationObserver v-slot="{ handleSubmit }">
      <form id="login-form" @submit.prevent="handleSubmit(submit_elent)">
        <v-card-text class="pa-0">
          <image-up
            v-if="add.custom_name"
            :editId="editId"
            :userID="user._id"
            :image_count="add.image_count"
            :maxImg="2"
            @save="(v, v2) => getFiles(v, v2)"
            :avtivated="getImages"
          />
          <div v-else>
            <v-img
              v-if="add.name.image"
              contain
              max-height="165"
              :src="`brands/${add.name._id}.png`"
            ></v-img>
            <image-up
              v-else
              :editId="editId"
              :userID="user._id"
              :image_count="add.image_count"
              :maxImg="2"
              @save="(v, v2) => getFiles(v, v2)"
              :avtivated="getImages"
            />
          </div>

          <ValidationProvider v-slot="{ errors }" rules="required|max:1|min:30">
            <v-combobox
              v-model="add.name"
              :items="items"
              item-text="name"
              item-value="_id"
              :return-object="true"
              auto-select-first
              persistent-placeholder
              placeholder=" "
              autofocus
              hide-details
              @change="change_combobox($event)"
              :label="$t('pin.name')"
            ></v-combobox>
            <v-card
              v-if="errors[0]"
              elevation="3"
              class="pa-2 red--text body-1 mb-1 mt-2"
            >
              <v-icon color="red">mdi-alert-circle-outline</v-icon>
              {{ $t(`validate.${errors[0]}`) }}
            </v-card>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required|max:1|min:50">
            <v-text-field
              type="text"
              :value="add.address.string"
              name="address"
              hide-details
              class="mt-3 mb-3"
              @blur="search__addres($event)"
              v-on:keydown.enter.prevent="search__addres($event)"
              persistent-placeholder
              :placeholder="$t('pin.placeholder__address')"
              :label="$t('address')"
            ></v-text-field>

            <v-expand-transition v-if="isInputAdressValidate">
              <v-list>
                <v-list-item
                  class="ma-0 pa-0"
                  v-for="(element, i) in items__search"
                  :key="i"
                >
                  <v-list-item-content
                    elevation="4"
                    @click="mapSearchChange(element)"
                    class="mt-2 mb-2 pa-2 elevation-4 rounded opasity"
                  >
                    <v-list-item-title
                      class="max-contant-autocomplete"
                      v-text="element.label"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-expand-transition>
            <v-card
              v-if="errors[0]"
              elevation="3"
              class="pa-2 red--text body-1 mb-1 mt-2"
            >
              <v-icon color="red">mdi-alert-circle-outline</v-icon>
              {{ $t(`validate.${errors[0]}`) }}
            </v-card>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-select
              v-model="add.pin_type"
              :items="pin_type"
              item-text="abbr"
              item-value="abbr"
              class="mt-3 mb-3"
              hide-details
              outlined
              :label="$t(`pin.type`)"
            >
              <template v-slot:selection="data">
                <v-img
                  :lazy-src="`../${data.item.abbr}--red.svg`"
                  max-height="30"
                  max-width="30"
                  contain
                  :src="`../${data.item.abbr}--red.svg`"
                >
                </v-img>
                {{ $t("pin." + data.item.abbr) }}
              </template>
              <template v-slot:item="data">
                <v-img
                  :lazy-src="`../${data.item.abbr}--red.svg`"
                  max-height="40"
                  max-width="40"
                  contain
                  :src="`../${data.item.abbr}--red.svg`"
                >
                </v-img>
                {{ $t("pin." + data.item.abbr) }}
              </template>
            </v-select>

            <v-card
              v-if="errors[0]"
              elevation="3"
              class="pa-2 red--text body-1 mb-1 mt-2"
            >
              <v-icon color="red">mdi-alert-circle-outline</v-icon>
              {{ $t(`validate.${errors[0]}`) }}
            </v-card>
          </ValidationProvider>
          <ValidationProvider v-slot="{ errors }" rules="required">
            <v-select
              item-text="abbr"
              item-value="value"
              class="mt-3 mb-3"
              hide-details
              v-model="add.pin_status"
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
            <v-card
              v-if="errors[0]"
              elevation="3"
              class="pa-2 red--text body-1 mb-1 mt-2"
            >
              <v-icon color="red">mdi-alert-circle-outline</v-icon>
              {{ $t(`validate.${errors[0]}`) }}
            </v-card>
          </ValidationProvider>
          <h5>{{ $t("pin.contact") }}</h5>
          <ValidationProvider
            v-for="(item, index) in add.phones"
            :key="index + 'phones'"
            v-slot="{ errors }"
            rules="max:9|min:9"
          >
            <v-text-field
              v-model="add.phones[index]"
              append-outer-icon="mdi-close"
              @click:append-outer="del_phone(index)"
              :label="$t('phone')"
              :name="`phone` + index"
              persistent-placeholder
              placeholder=" "
              clearable
              prefix="+48"
              class="mt-3 mb-3"
              type="number"
              hide-details
            />

            <v-card
              v-if="errors[0]"
              elevation="3"
              class="pa-2 red--text body-1 mb-1 mt-2"
            >
              <v-icon color="red">mdi-alert-circle-outline</v-icon>
              {{ $t(`validate.${errors[0]}`) }}
            </v-card>
          </ValidationProvider>
          <v-btn
            :disabled="add.phones.length === 4"
            @click="add_phone(true)"
            block
            outlined
            plain
            color="#7F7F7F"
          >
            <v-icon color="#7F7F7F">mdi-plus</v-icon>
          </v-btn>
          <h5>{{ $t("site_url") }}</h5>
          <ValidationProvider v-slot="{ errors }">
            <v-text-field
              v-model="add.site_URL"
              :rules="[rules.regexUrlFormat]"
              :label="$t('site_url')"
              name="web page"
              persistent-placeholder
              placeholder=" "
              clearable
              class="mt-3 mb-3"
              hide-details
            />

            <v-card
              v-if="errors[0]"
              elevation="3"
              class="pa-2 red--text body-1 mb-1 mt-2"
            >
              <v-icon color="red">mdi-alert-circle-outline</v-icon>
              {{ $t(`validate.${errors[0]}`) }}
            </v-card>
          </ValidationProvider>

          <h5>{{ $t("pin.working_time") }}</h5>
          <v-row
            no-gutters
            align="center"
            v-for="(element, index) in add.working_time"
            :key="index"
            style="height: 46px"
          >
            <v-col
              class="text-capitalize font-weight-regular ma-0 pa-0"
              cols="5"
            >
              <div class="body-1">{{ $t(`pin.${element.day}`) }}</div>
            </v-col>
            <v-col
              class="text-capitalize font-weight-regular ma-0 pa-0 d-flex"
              cols="7"
            >
              <v-text-field
                :rules="[regexTimeFormat(index, 'start', element.time_start)]"
                v-model="element.time_start"
                dense
                hide-details
                max-height="46"
                weight="66"
                outlined
                class="centered-input"
              ></v-text-field>
              <v-icon class="pl-2 pr-2">mdi-minus</v-icon>
              <v-text-field
                :rules="[regexTimeFormat(index, 'end', element.time_end)]"
                v-model="element.time_end"
                dense
                center
                hide-details
                max-height="46"
                weight="66"
                outlined
              ></v-text-field>
              <v-btn @click="del_day_working(index)" icon center class="ml-1">
                <v-tooltip right open-delay="200">
                  <template v-slot:activator="{ on, attrs }">
                    <v-icon color="red" dark v-bind="attrs" v-on="on">
                      mdi-close-circle-outline
                    </v-icon>
                  </template>
                  <span>{{ $t(`pin.clear`) }}</span>
                </v-tooltip>
              </v-btn>
            </v-col>
          </v-row>
          <v-alert class="body-2 mt-2" shaped dark color="info">{{
            $t(`pin.info_massege_working_time`)
          }}</v-alert>
        </v-card-text>
        <div
          v-if="elementIsVisible"
          :class="
            $vuetify.breakpoint.width <= 768
              ? `sidebar-view__footer2`
              : `sidebar-view__footer2`
          "
        >
          <v-btn
            elevation="5"
            height="40"
            style="font-weight: 500 !important"
            class="white--text text-capitalize font-weight-bold"
            block
            color="#FF0013"
            type="submit"
            >{{ !editId ? $t("pin.add_point") : $t("pin.edit_point") }}</v-btn
          >
        </div>
      </form>
    </ValidationObserver>
  </v-card>
</template>

<script>
import Vue from "vue";
import VueObserveVisibility from "vue-observe-visibility";

Vue.use(VueObserveVisibility);
import { ValidationObserver, ValidationProvider } from "vee-validate";
import Timeselector from "vue-timeselector";
import adminCategoryInfo from "~/components/ImageUpload";
import { mapGetters } from "vuex";
import { OpenStreetMapProvider } from "leaflet-geosearch";
const provider = new OpenStreetMapProvider({
  params: {
    "accept-language": "pl",
    countrycodes: "pl",
    addressdetails: 1,
    // extratags: 1,
    limit: 3,
  },
});
export default {
  components: {
    ValidationObserver,
    ValidationProvider,
    Timeselector,
    "image-up": adminCategoryInfo,
  },
  props: {
    editId: {
      default: false,
    },
  },
  async fetch() {
    const { data } = await this.$axios.get("/config");
    this.items = data.points;
  },
  fetchOnServer: true,
  data() {
    return {
      items: [],
      add: {
        name: null,
        custom_name: true,
        address: {
          info: null,
          string: null,
        },
        location: null,
        pin_status: null,
        pin_type: null,
        site_URL: null,
        phones: [],
        working_time: [
          {
            day: "monday",
            time_start: "00:00",
            time_end: "00:00",
            active: false,
          },
          {
            day: "tuesday",
            time_start: "00:00",
            time_end: "00:00",
            active: false,
          },
          {
            day: "wednesday",
            time_start: "00:00",
            time_end: "00:00",
            active: false,
          },
          {
            day: "thursday",
            time_start: "00:00",
            time_end: "00:00",
            active: false,
          },
          {
            day: "friday",
            time_start: "00:00",
            time_end: "00:00",
            active: false,
          },
          {
            day: "saturday",
            time_start: "00:00",
            time_end: "00:00",
            active: false,
          },
          {
            day: "resurrection",
            time_start: "00:00",
            time_end: "00:00",
            active: false,
          },
        ],
      },
      elementIsVisible: false,
      rules: {
        regexUrlFormat(value) {
          try {
            new URL(value);
          } catch (_) {
            return false;
          }
          return true;
        },
      },
      images: null,
      imagesIsEditable: false,
      getImages: false,
      items__search: [],
      show: false,
      select: null,
      loading: false,
      isLoadingSearch: false,
      isInputAdressValidate: false,
      pin_type: [{ abbr: "shop" }, { abbr: "store" }, { abbr: "pub_catering" }],
      oldValueAddres: null,

      pin_status: [
        { abbr: "status_true", value: true },
        { abbr: "status_false", value: false },
      ],
    };
  },
  methods: {
    change_combobox(ev) {
      if (typeof ev == "string" || ev == null) {
        this.add.custom_name = true;
      } else {
        this.add.custom_name = false;
      }
    },
    visibilityChanged(isVisible, entry) {
      this.elementIsVisible = isVisible;
    },
    async getPointInformation() {
      if (!this.editId) return;
      await this.$store.dispatch(`map/IsModalLoading`, true);
      var { data } = await this.$axios.get(
        `/profile/B2B?id_point=${this.editId}`
      );
      this.add = data;
      if (!data.custom_name) {
        this.add.name = this.add.config_name;
        delete this.add.config_name;
      }

      console.log(this.add);
      await this.$store.dispatch(`map/IsModalLoading`, false);
    },
    getFiles(v, v2) {
      this.images = v;
      this.imagesIsEditable = v2;
    },
    async search__addres(val) {
      if (!val) return;
      if (!val.target) return;
      if (!val.target._value) return;
      val = val.target._value;
      if (val === this.oldValueAddres) return;
      if (this.isLoadingSearch) return;

      this.isLoadingSearch = true;
      this.items__search = [];

      var localhuita = await provider.search({
        query: val,
      });
      console.log(localhuita);
      if (!localhuita) return;
      this.items__search = localhuita;
      this.isInputAdressValidate = true;
      this.isLoadingSearch = false;
      this.oldValueAddres = val;
    },

    mapSearchChange(element) {
      if (!element || element === null) return;
      if (!element.raw) return;
      if (!element.raw.address) return;
      const mini_address = element.raw.address;
      if (!mini_address.house_number) {
        this.$vueOnToast.pop("error", this.$t("pin.errors.not_house_number"));
        return;
      }
      console.log(mini_address.city);
      if (
        (mini_address.city ||
          mini_address.hamlet ||
          mini_address.town ||
          mini_address.village) == undefined ||
        null
      ) {
        this.$vueOnToast.pop("error", this.$t("pin.errors.not_city"));
        return;
      }
      if (!mini_address.road || !mini_address.neighbourhood) {
        this.$vueOnToast.pop("error", this.$t("pin.errors.not_house_road"));
        return;
      }
      this.add.location = {
        type: "Point",
        coordinates: [element.y, element.x],
      };
      this.add.address.info = mini_address;
      this.add.address.string = `${
        mini_address.city ||
        mini_address.hamlet ||
        mini_address.town ||
        mini_address.village
      }, ${mini_address.road || mini_address.neighbourhood || null} ${
        mini_address.house_number || null
      }`;
      this.isInputAdressValidate = false;
    },
    async submit_elent() {
      await this.$store.dispatch(`map/IsModalLoading`, true);
      let GenerateIconForMap = `${this.add.pin_type}--${
        this.add.pin_status ? "red" : "gray"
      }.svg`;
      await this.$store.dispatch("map/UpdateSimpleLocation", {
        value: {
          loc: this.add.location.coordinates,
          icon: GenerateIconForMap,
          onlyPan: false,
        },
      });
      var generetedNewData;
      if (!this.add.custom_name) {
        this.add.name = this.add.name._id;
      }
      if (!this.editId) {
        generetedNewData = { ...this.add };
      } else {
        generetedNewData = { ...this.add, edit: true };
        delete generetedNewData.image_count;
      }
      const { data } = await this.$axios.post(
        "/profile/B2B/add",
        generetedNewData
      );
      let localPointId;
      if (!this.editId) {
        localPointId = data.PointId;
      } else {
        localPointId = this.editId;
      }

      this.getImages = !this.getImages;
      let interval;
      interval = await setInterval(() => {
        if (this.images !== null) {
          console.log(1, this.images);
          console.log(this.imagesIsEditable);
          return clearInterval(interval);
        } else {
          console.log(this.imagesIsEditable);
          console.log("clear interval");

          return clearInterval(interval);
        }
      }, 10);

      if (this.imagesIsEditable && this.add.custom_name) {
        if (!this.images) {
          await this.$axios.post(
            `/profile/B2B/images?pointID=${localPointId}&filesIsNull=true`
          );
          console.log("send nill data");
        } else {
          console.log("send not  nill data");
          var bodyFormData = new FormData();
          this.images.forEach((element, i) => {
            bodyFormData.append("files_" + i, element.file);
          });
          await this.$axios.post(
            `/profile/B2B/images?pointID=${localPointId}`,
            bodyFormData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
        }
      }

      // }
      this.$vueOnToast.pop(
        "success",
        this.editId ? this.$t("pin.update") : this.$t("pin.create")
      );
      await this.$store.dispatch(`map/fetchMapPoints`);
      await this.$store.dispatch(`map/IsModalLoading`, false);

      this.$emit("exit");
    },
    regexTimeFormat(index, position, value) {
      const isValideValue = /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(
        value
      );
      if (
        (this.add.working_time[index].time_start ||
          this.add.working_time[index].time_end) !== "00:00"
      ) {
        console.log("valid");
        const isValideStartByIndexStart =
          /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(
            this.add.working_time[index].time_start
          );
        const isValideStartByIndexEnd =
          /^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(
            this.add.working_time[index].time_end
          );
        if (isValideStartByIndexStart && isValideStartByIndexEnd) {
          this.add.working_time[index].active = true;
        } else {
          this.add.working_time[index].active = false;
        }
      } else {
        this.add.working_time[index].active = false;
      }

      if (isValideValue) {
        return true;
      } else {
        return "errr bliat";
      }
    },
    add_phone() {
      var allLeng = this.add.phones.length;
      if (allLeng >= 4) {
        return false;
      }
      this.add.phones.push(null);
    },
    del_phone(index) {
      if (this.add.phones.length === 1) return;
      this.add.phones.splice(index, 1);
    },
    del_day_working(index) {
      this.add.working_time[index].time_start = "00:00";
      this.add.working_time[index].time_end = "00:00";
    },
  },

  watch: {
    editId: {
      handler(newVal) {
        if (newVal) {
          this.getPointInformation();
        }
      },
      immediate: true,
    },
  },

  computed: mapGetters({
    simpleLocation: "map/simpleLocation",
    user: "auth/user",
  }),
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
  position: static;
  bottom: 0;
  left: 0;
  padding: 24px;
  z-index: 3;
  background: #ffffff;
  border-top: 1px solid rgba(0, 0, 0, 0.08);
  //   background-color: red;

  width: var(--width-cont);
}
.max-contant-autocomplete {
  cursor: pointer;
  white-space: break-spaces !important;
}
.opasity:hover {
  opacity: 0.7;
  transition: all 0.9;
}
</style>
