<template>
  <v-row justify="center" >
    <v-dialog
      v-model="show"
      :opacity="0.8"
      elevation="0"
      class="card_vacancy"
      max-width="876"
      transition="dialog-bottom-transition"
      v-if="item._id"
    >
      <!-- <v-card elevation="0"   style="background: unset;"> -->
        <!-- <v-card-title class="text-h5">
          Use Google's location service?
        </v-card-title>
        <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text

          >
            Disagree
          </v-btn>
          <v-btn
            color="green darken-1"
            text

          >
            Agree
          </v-btn>
        </v-card-actions> -->
        
          <!-- <div style="justify-content: center" class="card_vacancy" v-if="item._id"> -->
 
              <nuxt-link :to="'/seamen/vacancies/' + item._id" class="card_vacancy__item item_card">
                <div class="item_card__top top">
                    <img class="top__image" :src="item.avatar" :alt="item.company_name">
                    <div class="top__text">
                      <h2>{{item.company_name}}</h2>
                      <p>{{item.position}}</p>
                      <span>{{item.additional_info == null ? 'Lack of description':item.additional_info}}</span>
                    </div>
                </div> 
                <div class="item_card__bottom card_bottom">
                  <div class="card_bottom__item item__data">
                    <img class="item__data__icon" :src="'/icons/custom/Dollar.svg'" alt="">
                    <div class="item__data__text">
                        <div>Salary:</div>
                        <div> {{ item.negotiable ? 'Договорная' : item.join_on + ' - ' +  item.join_off + item.currency +' / ' +  item.period}}</div>
                    </div>
                  </div>
                  <div class="card_bottom__item item__data">
                    <img class="item__data__icon" :src="'/icons/custom/Calendar.svg'" alt="">
                    <div class="item__data__text">
                        <div>Join date:</div>
                        <div>{{ new Date(item.signed_on).toJSON().slice(0,10)}}</div>
                    </div>
                  </div>
                  <div class="card_bottom__item item__data">
                    <img class="item__data__icon" :src="'/icons/custom/Clock.svg'" alt="">
                    <div class="item__data__text">
                        <div>Duration:</div>
                        <div>{{item.duration.days}}D/{{item.duration.months}}M/{{item.duration.years}}Y</div>
                    </div>
                  </div>
 



                    <div class="card_bottom__item item__data">
                      <img class="item__data__icon" :src="'/icons/custom/Info.svg'" alt="">
                      <div class="item__data__text">
                          <div>English level:</div>
                          <div>{{item.eng_level}}</div>
                      </div>
                    </div>
                    <div class="card_bottom__item item__data">
                      <img class="item__data__icon" :src="'/icons/custom/Video.svg'" alt="">
                      <div class="item__data__text">
                          <div>Video interview:</div>
                          <div>{{item.videoInterview ? 'Yes':'No'}}</div>
                      </div>
                    </div>
                    <div class="card_bottom__item item__data">
                      <img class="item__data__icon" :src="'/icons/custom/Testing.svg'" alt="">
                      <div class="item__data__text">
                          <div>Testing:</div>
                          <div>{{item.test ? 'Yes':'No'}}</div>
                      </div>
                    </div>


                </div>
              <!-- <img class="card_vacancy__image" src="https://cdn.hydra.bot/hydra_no_music.png" alt=""> -->
              <!-- <div class="text-container">
                <div class="text-container__header">
                    <h3 class="headline">{{item.position}}</h3>
                </div> -->
                <!-- <div class="text-container__content">
                    <p v-if="!item.negotiable" class="text-md-body-1"><v-icon color="light-blue accent-1" medium>mdi-currency-usd</v-icon>Salary: {{item.join_on}} - {{item.join_off}} {{item.currency}} / {{item.period}}</p> 
                    <p v-else class="text-md-body-1"><v-icon color="light-blue accent-1" medium>mdi-currency-usd</v-icon>Salary: Negotiable</p>  -->

                    <!-- <p class="text-md-body-1"><v-icon color="light-blue accent-1" medium>mdi-calendar-month</v-icon>Join date: {{ GoodTime(item.signed_on)}}</p> 
                    <p class="text-md-body-1"><v-icon color="light-blue accent-1" medium>mdi-timer-sand</v-icon>Duration: D/{{item.duration.days}}M/{{item.duration.months}}Y/{{item.duration.years}}</p>
                    <p class="text-md-body-1"><v-icon color="light-blue accent-1" medium>mdi-earth</v-icon>English level:	{{item.eng_level}}</p>
                    <p class="text-md-body-1"><v-icon color="light-blue accent-1" medium>mdi-video</v-icon>Video interview:	{{item.videoInterview ? 'yes':'no'}}</p>
                    <p class="text-md-body-1"><v-icon color="light-blue accent-1" medium>mdi-ab-testing</v-icon>Testing:	{{item.test ? 'yes':'no'}}</p> -->
                <!-- </div> -->
              </nuxt-link>
             <!-- </div> -->
          <!-- </div> -->
      <!-- </v-card> -->
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    item:{
      // type: Object,
      default: {},
    }
  },
  computed: {
    show: {
      get () {
        return this.visible
      },
      set (value) {
         this.$emit('close')
      }
    }
  }
}
</script>
