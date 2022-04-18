<template>
  <div class="tarif-modal" v-on:click.self="$emit('close')">
    <div class="modal">
      <div class="header-abc">
        <div class="title-abc mb-20">
          {{ editRecord.tariffName ? "Изменить тариф" : "Добавить тариф" }}
        </div>
        <button class="icon-button" @click.prevent="$emit('close')">
          <img src="~assets/svg/close_icon.svg" alt="" />
        </button>
      </div>
      <div class="content">
        <div :class="['text-field', 'mb-20']">
          <div class="text-title mb-10">Название</div>
          <input
            v-model="fd.tariffName"
            type="text"
            placeholder="Введите название тарифа"
          />
        </div>
        <custom-select
          v-if="!editRecord.tariffName"
          class="mb-20"
          title="Вид продвижения"
          :options="tarifs"
          @input="onSelectInput"
        />
        <custom-select
          v-else
          class="mb-20"
          title="Вид продвижения"
          :options="tarifs"
          :default="computeDefault()"
          @input="onSelectInput"
        />
        <div class="row">
          <div class="col-2 mr-30">
            <div :class="['text-field', 'mb-20']">
              <div class="text-title mb-10">Количество от</div>
            </div>
          </div>
          <div class="col-2 mr-30">
            <div :class="['text-field', 'mb-20']">
              <div class="text-title mb-10">Количество до</div>
            </div>
          </div>
          <div class="col-2">
            <div :class="['text-field', 'mb-20']">
              <div class="text-title mb-10">Цена за единицу</div>
            </div>
          </div>
        </div>

        <div v-for="(newTariff, index) in fd.tariffItems" :key="index">
          <div class="row mb-10">
            <div class="col-2 mr-30">
              <div :class="['text-field', 'mb-20']">
                <input
                  v-model="newTariff.minTariffAmount"
                  :minlength="100"
                  type="text"
                  placeholder="1"
                />
              </div>
            </div>
                <div class="col-2 mr-30">
              <div :class="['text-field', 'mb-20']">
                <input
                  v-model="newTariff.maxTariffAmount"
                  type="text"
                  placeholder="1"
                />
              </div>
            </div>

            <div class="col-2">
              <div :class="['text-field', 'mb-20']">
                <input
                  v-model="newTariff.tariffCost"
                  type="text"
                  placeholder="0.50 RUB"
                />
              </div>
            </div>
            <button class="icon-button" @click="RemoveTariff(index)">
              <img src="~assets/svg/close_icon.svg" alt="" />
            </button>
          </div>
        </div>
 
        <div class="TariffButtAdd" @click="AddTariff">
         <div class="TatiffBody">
           Add
         </div>
        </div>
        <button class="form-submit-button" @click="onSubmit">
          {{ editRecord.tariffName ? "Сохранить" : "Добавить тариф" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import CustomSelect from "../CustomSelect.vue";
export default {
  props: {
    editRecord: {
      type: Object,
      default: () => ({
        tariffName: "",
      }),
    },
  },
  async fetch() {
    let resp = await this.$http.post(`${process.env.LINK}/api/getTariffsTypes`);
    resp = await resp.json();
    this.tariffsTypes = resp.payload;
  },
  data() {
    return {
      fd: {
        tariffName: "",
        tariffType: "",
        tariffItems: [{ tariffCost: 0, minTariffAmount: 100 ,maxTariffAmount:0}]
        // tariffAmount: 0,
        // tariffCost: 0,
      },
      tariffsTypes: [],
      // tariffsItems: [{ tariffCost: 0, tariffAmount: 0 }],
    };
  },
  computed: {
    tarifs() {
      return this.tariffsTypes.map((el, index) => {
        return {
          name: el,
          value: index, 
        };
      });
    },
  },
  created() {
    if (this.editRecord.tariffName) {
      this.fd.tariffName = this.editRecord.tariffName;
      this.fd.tariffType = this.editRecord.tariffType;
       this.fd.tariffItems = this.editRecord.tariffItems;
      // this.fd.tariffAmount = this.editRecord.tariffAmount;
      // this.fd.tariffCost = this.editRecord.tariffCost;
    }
  },
  methods: {
    onSelectInput(val) {
      this.fd.tariffType = val.name;
    },
    computeDefault() {
      return {
        name: this.fd.tariffType,
      };
    },
    async onSubmit() {
        if(!this.fd.tariffName){
            this.$notify({ group: "main", text: "Укажите имя тарифа!", type: "error" });
            return;
        }
        if(!this.fd.tariffType){
            this.$notify({ group: "main", text: "Выберете тип тарифа тарифа!", type: "error" });
            return;
        }
        for (let index = 0; index < this.fd.tariffItems.length; index++) {
            const element = this.fd.tariffItems[index];
            if(element.minTariffAmount < 100){
                this.$notify({ group: "main", text: "Укажите минимальную сумму тарифа больше 100!", type: "error" });
                return;
            }
            if(element.maxTariffAmount <= 0){
                this.$notify({ group: "main", text: "Укажите максимальную сумму тарифа больше 0!", type: "error" });
                return;
            }
            if(element.tariffCost <= 0){
                this.$notify({ group: "main", text: "Укажите цену за единицу тарифа больше 0!", type: "error" });
                return;
            }
        }
      if (this.editRecord.tariffName) {
        let resp = await this.$http.post(
          `${process.env.LINK}/api/admin/tariff/update/${this.editRecord._id}`,
          this.fd
        );
        resp = await resp.json();
        if (resp.payload.ok === 1) {
          this.$emit("edit", {
            ...this.editRecord,
            ...this.fd,
          });
          this.$emit("close");
        } else {
          this.$notify({ group: "main", text: "Error !!!", type: "error" });
        }
      } else {
        let resp = await this.$http.post( 
          `${process.env.LINK}/api/admin/tariff/create`,
          this.fd
        ); 
        resp = await resp.json();
        this.$emit("new", resp.payload);
        this.$emit("close");
      }
    },
    AddTariff() {
      this.fd.tariffItems.push({tariffCost: 0, minTariffAmount: 100 ,maxTariffAmount:0 }); 
    },
    RemoveTariff(indexTariff){
      let index = this.fd.tariffItems.indexOf(indexTariff);
      this.fd.tariffItems.splice(index, 1);
    }
  },
};
</script>

<style lang="scss" scoped>
.header-abc {
  display: flex;
  justify-content: space-between;
  text-transform: none;
}
.title-abc {
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
  background-color: rgba(0, 0, 0, 0.3);

  .modal {
    .content {
      .row {
        align-items: center;
        @media (max-width: 576px) {
          display: flex;
          flex-wrap: wrap;
        }
      }
      .col-2 {
            height: 42.8px;
        @media (max-width: 576px) {
          flex: 0 0 100%;
          margin-right: 0;
        }
      }
    }
  }
}
.TariffButtAdd {
    display: flex;
    justify-content: center;
}
.TatiffBody {
    font-family: "Gilroy";
    font-weight: 500;
    background: #4378FF;
    box-shadow: 0px 2px 2px -1px rgb(33 33 33 / 20%);
    border-radius: 7px;
    padding: 7px 15px;
    font-size: 15px;
    color: #fff;
    border: none;
    cursor: pointer;
}
</style>
