<template>
  <div class="acc-modal">
    <div class="modal">
      <div class="header">
        <!-- <button class="icon-button" @click.prevent="$emit('close')">
          <img src="~assets/svg/close_icon.svg" alt="">
        </button> -->
    <table class="data-table">
      <tr class="header">
        <th class="status" />
        <th>Аккаунт</th>
        <th>Дата</th>
        <th class="order-type">Действие</th>
        <th>Ссылка</th>
        <th>Задано</th> 
        <th>ЦЕНА</th>
      </tr>
      <tr v-for="(record, index) in records" :key="index" class="data-row">
          {{record}}
        <!-- <td aria-label="СТАТУС" class="status"><record-status :status="record.orders.orderStatus" /></td> -->
        <!-- <td aria-label="АККАУНТ">{{ record.acc.username }}</td> -->
        <!-- <td aria-label="ДАТА">{{ record.date }}</td> -->
        <!-- <td aria-label="ДЕЙСТВИЕ">{{ record.orderType }}</td> -->
        <!-- <td aria-label="ССЫЛКА"> <a :href="record.url" class="button-icon"><img src="~assets/svg/link_icon.svg" alt="" /></a></td> -->
        <!-- <td aria-label="ЗАДАНО">{{ record.orderAmount }}</td> -->
        <td aria-label="ЦЕНА" class="price-cell">{{ record.orders.totalOrderValue }}RUB</td>
      </tr>
    </table>
      </div>
    </div> 
  </div>
</template>

<script>
export default {
props: { 
    userNumber: {
    type: Number
    }
},
data () {
    return {
      records: [],
    }
  },
 async fetch () {
    try {
      let resp = await this.$http.post(`${process.env.LINK}/api/admin/user/order/${this.userNumber}`)
      resp = await resp.json()
      console.log(resp)
      this.records = resp.payload
    } catch (e) {
      console.log(e)
    }
  },
//   data () {
//     return {
//       fd: {
//         comment: '',
//         error: ''
//       }
//     }
//   },
  methods: {
    async onSubmit () {
    //   if (!~this.fd.comment.indexOf(";")){
    //     this.fd.error = "Вы не указали ни одного ;"
    //     console.log(123)
    //     return;
    //   }
    //   let item = await this.$axios.post(`${process.env.LINK}/api/user/add/comments`, {
    //     comment: this.fd.comment
    //   }).then(function (res) {
    //     console.log('nice cooment')
    //     return res
    //   })
    //     .catch(function (err) {
    //       console.log(err)
    //     })
    //   console.log(item)
    //   this.$store.commit('addComment', {
    //     comments: this.fd.comment,
    //     _id: item.data.payload.tiktokComment.comments[item.data.payload.tiktokComment.comments.length - 1]._id
    //   })
    //   this.$store.commit('changeModal', 'comment')
    }
  }
}
</script>

<style lang="scss" scoped>
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

            .header {
                display: flex;
                justify-content: space-between;
                text-transform: none;

                .title {
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 29px;
                    color: #212121;
                }
            }

            .content {
                .text-title {
                    font-size: 18px;
                    color: #212121;
                }
            }
        }
    }
    .mes{
      color: #4378FF;
      font-size: 20px;
    }
    
    .network-file {
        position: relative;
        opacity: 0;
        font-size: 0;
        z-index: 1;
        height: 100%;
    }

    .fake-box {
        position: relative;
        height: 61px;
        background: #F8F9FD;;
    }

    .network-file-fake {
        position: absolute;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 0;
        padding: 10px 20px;
        display: inline-block;
        width: 100%;
        border-radius: 7px;
        border: 1px solid #9db8fd;
        font-size: 18px;
        margin-bottom: 10px;
        background: #F8F9FD;
        background: url('~assets/svg/dowload-s.svg') center no-repeat;
    }

  .data-table {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    background-color: #FFFFFF;
    box-shadow: 0px -3px 8px -5px rgba(33, 33, 33, 0.303296);
    border-radius: 7px;

    .header {
      color: #A6AFC6;
      font-size: 12px;
      line-height: 14px;
      text-transform: uppercase;

      th {
        padding-top: 18px;
        padding-bottom: 18px;
        text-align: left;
      }

      .acc {
        padding-left: 20px;
      }

      .order-type {
        width: 250px;
      }

      .title {
        width: 150px;
      }

      .actions {
        width: 140px;
      }
    }

    .data-row {
      border-top: 1px solid #D3D7E3;
      font-size: 12px;

      .number {
        padding-left: 10px;
        padding-left: 18px;
        color: #4378FF;
        span {
          color: #A6AFC6;
        }
         @media (max-width: 1300px) {
          padding-left: 30px;
        };
        @media (max-width: 576px) {
          padding-left: 20px;
        };
      }

      .acc {
        padding-left: 15px;
      }

      .price-cell {
        color: #4378FF;
      }

      .percent-done {
        color: #4378FF;
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
  }

</style>
