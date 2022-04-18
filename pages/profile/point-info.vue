<template>
  <v-container v-if="point_data">
    <v-dialog v-model="modal_done" width="500">
      <v-card style="z-index: 9999999999999999" class="pa-3">
        <v-row justify="end">
          <v-btn icon @click="modal_done = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-row>
        <v-row no-gutters justify="center" align="center">
          <h3>{{ $t("pin.order_done") }}</h3>
          <v-col cols="12">
            <v-row no-gutters justify="center" align="center">
              <div class="done-cyrcle_1 rounded-circle mt-4 mb-4">
                <div class="done-cyrcle_2 rounded-circle">
                  <div class="done-cyrcle_center rounded-circle">
                    <v-row
                      no-gutters
                      style="width: 100%; height: 100%"
                      justify="center"
                      align="center"
                    >
                      <v-icon size="40" color="white">mdi-check</v-icon>
                    </v-row>
                  </div>
                </div>
              </div>
            </v-row>
          </v-col>
          <div class="gray-text font-w500 mb-2">
            {{ $t("pin.order_massage") }}
          </div>
        </v-row>
      </v-card>
    </v-dialog>
    <v-row no-gutters align="center">
      <v-col cols="12">
        <h4>
          {{
            point_data.custom_name
              ? point_data.name
              : point_data.config_name.name
          }}
        </h4></v-col
      >
      <h5 class="wsbs gray-text">{{ point_data.address.string }}</h5></v-row
    >
    <v-row no-gutters align="center" class="mt-1">
      <v-img
        width="24"
        max-width="24"
        max-height="24"
        height="24"
        class="mr-1"
        :alt="point_data.name"
        :src="getIconName(point_data.pin_type, point_data.pin_status)"
      ></v-img>
      <h5>
        {{ $t(`pin.${point_data.pin_type}`) }} •
        {{ $t(`pin.status_${point_data.pin_status}`) }}
      </h5>
    </v-row>
    <v-btn
      v-if="$store.state.auth.role == 'user'"
      style="font-weight: 500 !important"
      class="mt-2 white--text text-capitalize font-weight-bold"
      color="red"
      block
      :disabled="disableBtn"
      @click="newOrder"
    >
      {{ $t("pin.get_order") }}
    </v-btn>
    <v-row
      no-gutters
      align="center"
      v-if="
        (point_data.image_count && point_data.image_count >= 0) ||
        (!point_data.custom_name && point_data.config_name.image)
      "
    >
      <v-col cols="12"> <v-divider class="mt-4 mb-4"></v-divider></v-col>
      <v-col class="d-flex" cols="12">
        <v-icon size="19">mdi-image</v-icon>
        <h4 class="gray-text ml-2">{{ $t("pin.images") }}</h4></v-col
      >
      <v-row
        justify="space-around"
        v-if="!point_data.custom_name && point_data.config_name.image"
      >
        <div class="mt-2" v-viewer="{ navbar: false }" id="image_228">
          <img
            @click="open_imege(228)"
            width="344"
            height="150"
            class="rounded-lg obj-fit-img"
            alt="Getman Image Point"
            :src="`brands/${point_data.config_name._id}.png`"
          />
        </div>
      </v-row>
      <v-row
        justify="space-around"
        v-if="point_data.image_count && point_data.image_count >= 0"
      >
        <div
          class="mt-2"
          v-for="(index, number_img) in point_data.image_count + 1"
          :key="index + `_img_number`"
          v-viewer="{ navbar: false }"
          :id="'image_' + index"
        >
          <img
            @click="open_imege(index)"
            width="133"
            height="100"
            class="rounded-lg obj-fit-img"
            alt="Getman Image Point"
            :src="`userimages/${point_data.userID}/${point_data._id}/${number_img}.png`"
          />
        </div>
      </v-row>
    </v-row>

    <v-row
      no-gutters
      align="center"
      v-if="(point_data.phones && point_data.phones[0]) || point_data.site_URL"
    >
      <v-col cols="12"> <v-divider class="mt-4 mb-4"></v-divider></v-col>

      <v-col class="d-flex" cols="12">
        <v-icon size="19">mdi-phone</v-icon>
        <h4 class="gray-text ml-2">{{ $t("pin.contact") }}</h4></v-col
      >
      <div v-if="point_data.phones && point_data.phones[0]" class="pa-0">
        <v-col
          cols="12"
          v-for="(phone, index) in point_data.phones"
          :key="index + `_phone`"
          class="gray-text mt-1 pa-0"
        >
          +48 ({{ phone.slice(0, 3) }}) {{ phone.slice(3, 6) }}-{{
            phone.slice(5, 7)
          }}-{{ phone.slice(7, 9) }}
        </v-col>
      </div>
      <v-col cols="12" class="mt-2" v-if="point_data.site_URL">
        <a
          target="_blank"
          class="red--text text-decoration-none"
          :href="point_data.site_URL"
          >{{ point_data.site_URL }}</a
        >
      </v-col>
    </v-row>
    <!-- <v-row
      no-gutters
      align="center"
      v-if="point_data.address && point_data.firm_name && point_data.phone"
    >
      <v-col cols="12"> <v-divider class="mt-4 mb-4"></v-divider></v-col>

      <v-col class="d-flex" cols="12">
        <v-icon size="19">mdi-information</v-icon>
        <h4 class="gray-text ml-2">{{ $t("pin.contact_firm") }}</h4></v-col
      >
      <v-col cols="12" class="gray-text mt-1 pa-0">
        {{ point_data.firm_name }}
      </v-col>
      <v-col cols="12" class="gray-text mt-1 pa-0">
        {{ point_data.address }}
      </v-col>
      <v-col cols="12" class="gray-text mt-1 pa-0">
        +48 ({{ point_data.phone.slice(0, 3) }})
        {{ point_data.phone.slice(3, 6) }}-{{ point_data.phone.slice(5, 7) }}-{{
          point_data.phone.slice(7, 9)
        }}
      </v-col>
    </v-row> -->
    <v-row
      no-gutters
      align="center"
      v-if="point_data.working_time && point_data.working_time[0]"
    >
      <v-col cols="12"> <v-divider class="mt-4 mb-4"></v-divider></v-col>
      <v-col class="d-flex" cols="12">
        <v-icon size="19">mdi-timer</v-icon>
        <h4 class="gray-text ml-2">{{ $t(`pin.working_time`) }}</h4></v-col
      >
      <v-container>
        <v-row
          align="center"
          class="mt-2"
          v-for="(element, index) in point_data.working_time"
          :key="index + `_time`"
        >
          <v-col
            class="text-capitalize font-weight-regular ma-0 pa-0 gray-text"
            cols="5"
          >
            <div class="body-1">{{ $t(`pin.${element.day}`) }}</div>
          </v-col>
          <v-col
            class="text-capitalize font-weight-regular ma-0 pa-0 d-flex justify-end gray-text"
            cols="7"
          >
            <div v-if="element.active">
              <v-row> {{ element.time_start }} - {{ element.time_end }} </v-row>
            </div>
            <div v-else>{{ $t("pin.off-time") }}</div>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
  </v-container>
</template>

<script>
import "viewerjs/dist/viewer.css";
import Viewer from "v-viewer";
import Vue from "vue";
Vue.use(Viewer);
export default {
  data() {
    return {
      point_data: null,
      disableBtn: false,
      modal_done: false,
    };
  },
  props: {
    editId: {
      default: false,
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

  methods: {
    async newOrder() {
      console.log("order active");
      var OrderStatus = await this.$axios
        .post(`/profile/B2C/order`, {
          B2BID: this.point_data.userID,
          pointID: this.editId,
        })
        .then((data) => {
          return data.status;
        })
        .catch(function (error) {
          if (error.response) {
            if (error.response.status) {
              return error.response.status;
              //   this.disableBtn = true;
            }
          }
        });
      console.log(OrderStatus);
      if (OrderStatus === 200) {
        this.modal_done = true;
      } else {
        this.$vueOnToast.pop("error", this.$t("pin.errors.order_err"));
      }

      console.log(OrderStatus);
      this.disableBtn = true;
    },
    open_imege(index) {
      const viewers = this.$el.querySelector("#image_" + index).$viewer;
      viewers.show();
    },
    async getPointInformation() {
      if (!this.editId) return;
      await this.$store.dispatch(`map/IsModalLoading`, true);
      var { data } = await this.$axios.get(
        `/profile/B2B?id_point=${this.editId}&getAllPoints=true`
      );
      this.point_data = data;
      await this.$store.dispatch(`map/IsModalLoading`, false);
    },
    getIconName(typePoint, statusPoint) {
      return `/${typePoint}--${statusPoint ? "red" : "gray"}.svg`;
    },
  },
  destroyed() {
    this.$store.dispatch(`map/SetPointOnTheMap`, null);
  },
};
</script>

<style scoped>
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
.obj-fit-img {
  cursor: pointer;
  object-fit: cover;
}
.done-cyrcle_1 {
  padding: 14px;
  background: rgba(255, 0, 19, 0.08);
}
.done-cyrcle_2 {
  padding: 13px;
  background: rgba(255, 0, 19, 0.2);
}
.done-cyrcle_center {
  width: 71px;
  height: 71px;
  background: #ff0013;
}
</style>
