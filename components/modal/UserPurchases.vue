<template>
  <div class="acc-modal" v-on:click.self="$emit('close')">
      <div class="modal">
        <table class="data-table">
                      <button class="icon-button" @click.prevent="$emit('close')">
          <img src="~assets/svg/close_icon.svg" alt="">
        </button>
        <tr class="header">
            <th class="status" />
            <th>Дата</th> 
            <th class="order-type">Действие</th>
            <th>Ссылка</th>
            <th>Задано</th>
            <th>Сделано</th>
            <th>ЦЕНА</th>
            <th class="actions">Действия</th>
        </tr>
        <tr v-for="(record, index) in records" :key="index" class="data-row">
            <td aria-label="СТАТУС" class="status">
            <record-status :status="record.status" />
            </td>
      
            <td aria-label="ДАТА">
            {{ record.date }}
            </td>
            <td aria-label="ДЕЙСТВИЕ">
            {{ record.orderType }}
            </td>
            <td aria-label="ССЫЛКА">
            <a :href="record.url" class="button-icon">
                <img src="~assets/svg/link_icon.svg" alt="" />
            </a>
            </td>
            <td aria-label="ЗАДАНО">
            {{ record.orderAmount }}
            </td>
            <td aria-label="СДЕЛАНО">
            <div>
                {{ record.orderAmountDone }}
                <span class="percent-done"
                >({{
                    (record.orderAmountDone * 100) / record.orderAmount
                }}%)</span
                >
            </div>
            </td>
            <td aria-label="ЦЕНА" class="price-cell">
            {{ record.price }}
            RUB
            </td>
            <td aria-label="ДЕЙСТВИЯ">
            <!-- <div v-if="record.status == 'Paid'" class="record-actions"> -->
                <!-- <button @click="onAction(record, 'play')">
                <img src="~assets/svg/action_play.svg" alt="Запустить заказ" />
                </button> -->
                 <div class="record-actions"> 
                <button @click="onAction(record, 'delete')">
                    <img src="~assets/svg/action_two.svg" alt="Удалить заказ" />
                </button>
               </div>
            <!-- </div> -->
            
            <!-- <div v-if="record.status !== 'done'" class="record-actions">
                <div v-if="record.status === 'stop' || record.status === 'pause'">
                <button @click="onAction(record, 'play')">
                    <img src="~assets/svg/action_play.svg" alt="" />
                </button>
                <button @click="onAction(record, 'stop')">
                    <img src="~assets/svg/action_two.svg" alt="" />
                </button>
                </div> -->
                <!-- <button @click="onAction(record, 'stop')">
                    <img src="~assets/svg/action_two.svg" alt="" />
                </button> -->
            <!-- <div v-if="record.status == 'fail'" class="record-actions">
                <button @click="onAction(record, 'delete')">
                    <img src="~assets/svg/action_two.svg" alt="Удалить заказ" />
                </button>
            </div> -->

                <!-- <div v-if="record.status === 'play'">
                <button @click="onAction(record, 'pause')">
                    <img src="~assets/svg/action_pause.svg" alt="" />
                </button>
                <button @click="onAction(record, 'stop')">
                    <img src="~assets/svg/action_two.svg" alt="" />
                </button>
                </div> -->
            <!-- </div> -->
            </td>
        </tr>
        </table>
        </div>

            </div>
</template>

<script>
export default {
props: { 
    userNumber: {
    }
},
 async fetch() {
    let resp = await this.$http.post(`${process.env.LINK}/api/admin/user/order/${this.userNumber}`);
    resp = await resp.json();
    resp = resp.payload
    this.records = resp;
    console.log(resp);
  },
  data() {
    return {
      dataok: false,
      dataFetch: null,
      records: [],
    };
  },
  methods: {
    async onAction(record, type) {
      if (type === "stop") { 
        console.log("stop", record.id);
      }
      if (type === "play") {
        var error;
        if (type === "play") {
            var IdUrl = /video\/(\d+)/.exec(record.url);
            if (IdUrl) {IdUrl = IdUrl[1];}
            var UserName = /(@[-zA-z0-9]*)/.exec(record.url);
            if (UserName) {UserName = UserName[0].slice(2)}
            if (record.orderType == "Подписчики") {
                var SendData = {
                    username: record.acc.username,
                    countFollowers: record.orderAmount,
                };
            }
            if (record.orderType == "Лайки к видео") {
                var SendData = {
                    username: record.acc.username,
                    videoActionList: [{
                        awemeId: IdUrl,
                        countLikes: record.orderAmount,
                    }, ],
                };
            }
            if (record.orderType == "Просмоты под видео") {
                var SendData = {
                    username: record.acc.username,
                    videoActionList: [{
                        awemeId: IdUrl,
                        countView: record.orderAmount,
                    }, ],
                };
            }
            if (record.orderType == "Рассылка видео") {
                var SendData = {
                    username: record.acc.username,
                    videoActionList: [{
                        awemeId: IdUrl,
                        countShare: record.orderAmount,
                    }, ],
                };
            } 
            if (record.orderType == "Коментарии под видео") {
                if (this.$store.state.user.comments.length == 0) {
                    error ="У вас нет добавленных комментариев, их можно добавить в личном кабинете!";
                }
                if (this.$store.state.comment_selected == 0) {
                    error ="У вас нет выбраного списка комментариев, его можно выбрать в личном кабинете!";
                }
                if (error) {
                    this.$notify({
                        group: "main",
                        text: error,
                        type: "error",
                    });
                    return;
                }
                var SendData = {
                    username: UserName,
                    videoActionList: [{
                        awemeId: IdUrl,
                        commentList: [],
                    }, ],
                };
                let lol = this.$store.state.user.comments.findIndex(
                    (item) => item._id === this.$store.state.comment_selected
                );
                var comments = this.$store.state.user.comments[lol].comments;
                var comments_obj = comments.split(/\s*;\s*/);
                for (let index = 0; index < comments_obj.length - 1; index++) {
                    const element = comments_obj[index];
                    SendData.videoActionList[0].commentList.push({
                        text: element,
                    });
                }}
        }

        var respPlay = await this.$http.post(`${process.env.LINK}/api/test/action/play`,SendData);
        var respPlay = await respPlay.json();
        if(respPlay.payload == "Done"){
              record.status = "play";
              this.$notify({
                  group: "main",
                  text: "Successfully launched",
                  status: "success",
              }) 
        }
        console.log(respPlay);
      }
      if (type == "delete") {
              let resp = await this.$http.post(
                `${process.env.LINK}/api/user/profile/cart/refund/${record.id}`, {
                    price: record.price,
                    orderAmountDone: record.orderAmountDone,
                    orderAmount: record.orderAmount,
                    tarifCost: record.tarifCost,
                }
            );
            resp = await resp.json();
            if (resp.payload === "Done") {
                this.$notify({
                    group: "main",
                    text: "The money was successfully returned to the balance",
                    status: "success",
                });
                var MoneyCount = (parseInt(this.$store.getters.getUser.money) + resp.refund).toString();
                this.$store.commit("setMoney", MoneyCount);
                let ThisOrder = this.records.findIndex((item) => item.id === record.id);
                this.records.splice(ThisOrder, 1);
            } else {
                this.$notify({ group: "main", text: resp.payload, type: "error" });
            }
      }
    }
  },

};
</script>

<style lang="scss" scoped> 
$maxWidth: 1300;
@mixin adaptiv-font($pcSize, $mobSize) {
  $addSize: $pcSize - $mobSize;
  $maxWidth: $maxWidth - 320;
  font-size: calc(
    #{$mobSize + px} + #{$addSize} * ((100vw - 320px) / #{$maxWidth})
  );
}
.my-orders {
  padding-bottom: 20px;
}

.page-title {
  margin-top: 40px;
  margin-bottom: 40px;
  color: #212121;
  @include adaptiv-font(36, 28);
  @media (min-width: $maxWidth + px) {
    font-size: 36px;
  }
}
  .comment-area{
    width: 100%;
    max-height: 200px;
    height: 200px;
    border: 1px solid #212121;
    padding: 5px;
    font-family: inherit;
    font-size: 16px;
  }
    .acc-modal {
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .3);
        overflow-y: scroll;
        overflow-x: hidden;
        .modal {
            background-color: #fff;
            box-shadow: 0px 0px 15px rgba(33, 33, 33, 0.0521744);
            border-radius: 20px;
            padding: 20px;
            flex: 0 0 100%;
            max-width: 1300px;
            min-width: 320px;
            z-index: 1000;
            font-family: "Gilroy";
            font-weight: 500;
            .content {
                .text-title {
                    font-size: 18px;
                    color: #212121;
                }
            }
        }
    }
          @media (max-width: 975px) {
     .acc-modal {
       display: block;
     }
      }
.data-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  background-color: #ffffff;
  box-shadow: 0px -3px 8px -5px rgba(33, 33, 33, 0.303296);
  border-radius: 7px;


  .data-row {
    border-top: 1px solid #d3d7e3;
    font-size: 12px;
    @media (max-width: px) {
      border: none;
    }
    td {
      padding-top: 10px;
      padding-bottom: 10px;

      @media (max-width: 1300px) {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 30px 30px 30px 30px;
        text-align: right;
        font-size: 18px;
        border-bottom: 1px solid #d3d7e3;
        &:last-child {
          border-bottom: 3px solid #6a6a6b;
        }
      }

    }
    td::before {
      @media (max-width: 1300px) {
        content: attr(aria-label);
        float: left;
        font-family: Gilroy;
        font-weight: 600;
        font-size: 18px;
        text-transform: uppercase;
        color: #a6afc6;
      }
      @media (max-width: 576px) {
        font-size: 12px;
      }
    }

    .status {
      padding: 15px 20px;
      @media (max-width: 1300px) {
        padding: 30px 30px;
      }
      @media (max-width: 576px) {
        padding: 20px 20px 20px 20px;
      }
    }
    @media (max-width: 975px) {
        padding: 20px 20px 20px 20px;
      }
    .price-cell {
      color: #4378ff;
    }

    .percent-done {
      color: #4378ff;
    }
  }

  .record-actions {
    button {
      border: none;
      cursor: pointer;

      &:focus {
        outline: none;
      }
    }
  }

  .button-icon {
    text-decoration: none;
  }
  .acc-number {
    color: #4378ff;
    span {
      color: #a6afc6;
    }
  }
}
</style>
