<template>
  <div class="tarif-modal" v-on:click.self="$emit('close')">
    <div class="modal">
      <div class="header-abc">
        <button class="icon-button" @click.prevent="$emit('close')">
          <img src="~assets/svg/close_icon.svg" alt="">
        </button>
      </div>
      <div class="content">
        <div class="row">
          <div style="width: 100%;">
            <div :class="['text-field', 'mb-20']">
              <div class="text-title mb-10">
                {{ $t('quantityOn') }}
              </div>
              <input v-model="tariffAmount" type="text" placeholder="1">
            </div>
          </div>
        </div>
        <div class="select-field mb-10">
            <custom-select :title="$t('tariffChoose')" :options="options" @input="val => selected = val" />
        </div>
        <div class="cost d-flex space-between mb-20">
          <div>{{ $t('orderPrice') }}</div>
          <div class="value">
            {{ price }} RUB
          </div>
        </div> 
        <button class="form-submit-button order-button" @click="onSubmit">
         {{ $t('saveButton') }}
        </button>
        <div style="font-weight: 600;" class="card mt" v-if="Object.keys(nextOffer).length">
          <div>
            <strong style="font-size:20px">{{ nextOffer.minTariffAmount }}</strong> amount / <strong style="font-size:20px">
              {{ nextOffer.tariffCost * nextOffer.minTariffAmount }}
            </strong> RUB</div>
          <div class="card" style="background:darkseagreen;margin-left: 10px;">
            <strong style="font-size:20px">{{ benefit }}%</strong>Cheaper
          </div> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    editRecord: {
      type: Object
    } 
  }, 
  async fetch() {
    let resp = await this.$http.post(`${process.env.LINK}/api/getData`); 
    resp = await resp.json();
    this.getData = resp.payload[0].promotionType;
    // console.log(1,this.getData) 
  },
  created () {
      this.tariffAmount = this.editRecord.orderAmount ;
      //  console.log('edit',this.editRecord.orderType)
    //   console.log('lalalal',this.editRecord[0].orders.totalOrderValue)
  },
    data () {
    return {
        tariffAmount: 0,
        getData: [],
        selected: {},
        nextOffer: {},
        currentOffer: {}
    } 
  }, 
  methods: { 
    isAN(value) {
        if(value instanceof Number)
        value = value.valueOf();
        return  isFinite(value) && value === parseInt(value, 10);
    },
    async onSubmit () {
    if(isNaN(this.tariffAmount)){
        this.$notify({ group: 'main', text: this.$t('numberisNaN'), type: 'error' })
        return;
    } 
    if(this.tariffAmount == 0){
        this.$notify({ group: 'main', text: this.$t('numberToNull'), type: 'error' })
        return;
    }
    if (Object.keys(this.selected).length == 0) {
        this.$notify({ group: 'main', text: this.$t('tariffChoose'), type: 'error' })
         return;
    }
              if (!Number.isInteger(this.price)) {
            this.$notify({ group: 'main', text: this.$t('notInteger'), type: 'error' })
           return;
        } 
    this.editRecord.orderAmount = this.tariffAmount
    this.editRecord.price = this.price
      if (this.tariffAmount) {
        let resp = await this.$http.post(`${process.env.LINK}/api/user/order/update/${this.editRecord._id}`, {"tariffAmount":this.tariffAmount,"orderType":this.editRecord.orderType,"totalOrderValue": this.price})
        resp = await resp.json()
        if (resp.payload.ok === 1) { 
          this.$emit('edit', { 
            ...this.editRecord
          }) 
          this.$emit('close')
        } else {
          this.$notify({ group: 'main', text: 'Error !!!', type: 'error' })
        }
      } else {
        let resp = await this.$http.post(`${process.env.LINK}/api/admin/tariff/create`, this.fd)
        resp = await resp.json()
        this.$emit('new', resp.payload)
        this.$emit('close')
      }
    },
    detectOrderType(order) {
      if (order === "followers") {
        return "Подписчики";
      }
      if (order === "likesOnVideo") {
        return "Лайки на видео";
      }
      if (order === "shares") {
        return "Рассылка видео";
      }
      if (order === "viewsOnVideo") {
        return "Просмоты под видео";
      }
      if (order === "commentsOnVideo") {
        return "Комменты под видео";
      }
      // if (order == "likesOnComments") {
      //   return "likesOnComments";
      // }
      return "-"
    },
  },
  computed: {
    options () {
      for (let index = 0; index < this.getData.length; index++) {
        const element = this.getData[index];
        if(this.detectOrderType(this.editRecord.orderType) == element.title){
          return  element.tariffs.map((el, index) => ({ name: el.name, value: index })) 
        }
      }
    },
    price () {
        for (let index = 0; index < this.getData.length; index++) {
          const element = this.getData[index];
          if(this.detectOrderType(this.editRecord.orderType) == element.title){
            const tariffs = element.tariffs
              if (tariffs.length && tariffs[this.selected.value]) {
              const NewTariff = tariffs[this.selected.value]
              const likes = Number(this.tariffAmount)
                for (let i = 0; i < NewTariff.items.length; i++) {
                  const item = NewTariff.items[i]
                  const min = Number(item.minTariffAmount)
                  const max = Number(item.maxTariffAmount)
                  if (likes >= min && likes <= max) {
                    const cost = Number(item.tariffCost)
                    const sum = likes * cost
                    console.log("Количество лайко (" + likes + ") в интервале: " + min + " --- " + max + ". Цена: " + cost + ". Сумма:" + sum)
                    this.nextOffer = NewTariff.items[i + 1] || {}
                    this.currentOffer = item;
                    return sum
                  } else if (i == NewTariff.items.length - 1) {
                    console.log('Количество лайков не в одном интервале')
                  }        
                }
            } else {
              return 0;
            }
          }
        }
    },
    benefit () {
      const oldCostPrice = this.nextOffer.minTariffAmount * this.currentOffer.tariffCost
      const newCostPrice = this.nextOffer.minTariffAmount * this.nextOffer.tariffCost
      const diference = oldCostPrice - newCostPrice

      return Math.round(diference * 100 / oldCostPrice)
    }
  },
}
</script>

<style lang="scss" scoped>
  .mt{
    margin-top: 20px;
    display: flex;
    // flex-direction: column;
    align-items: center;
    justify-content: center;
  }
.mr-30{
        width: 100%;
}
  .header-abc{
        display: flex;
    justify-content: flex-end;
    text-transform: none;
  }
  .title-abc{
        font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    color: #212121;
}
  
  .tarif-modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);

  .modal {
    .content {
      .row {
        @media (max-width: 576px) {
          display: flex;
          flex-wrap: wrap;
        };
      }
      .col-2 {
        @media (max-width: 576px) {
          flex: 0 0 100%;
          margin-right: 0;
        };
      }
    }
  }
  }
      .value {
      color: #4378FF;
      font-weight: 600;
    }
</style>
