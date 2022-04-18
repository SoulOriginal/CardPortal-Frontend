<template>
  <div class="acc-modal">
    <div class="modal">
      <div class="header">
        <div class="title mb-20">
          Добавить новый аккаунт
        </div>
        <button class="icon-button" @click="$store.commit('changeModal', 'account')">
          <img src="~assets/svg/close_icon.svg" alt="">
        </button>
      </div>
      <div class="content">
        <div :class="['text-field', 'mb-20']">
          <div class="text-title mb-10">
            Имя пользователя
          </div>
          <input v-model="fd.username" type="text" placeholder="Имя пользователя">
        </div>
        <div :class="['text-field', 'mb-20']">
          <div class="text-title mb-10">
            Ссылка на аккаунт
          </div>
          <input v-model="fd.accountUrl" type="text" placeholder="Вставьте ссылку">
        </div>
        <button class="form-submit-button" @click.prevent="onSubmit">
          {{ 'Сохранить' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    account: {
      type: Object,
      default: {}
    },
    userNumber: {
      type: Number,
      default: -1
    }
  },
  data () {
    return {
      fd: {
        accountUrl: '',
        username: ''
      }
    }
  },

  methods: {
    async onSubmit () {
      let item = ''
      if (this.account.status === 'USER') {
        item = await this.$axios.post(`${process.env.LINK}/api/user/add/account`, {
          accountUrl: this.fd.accountUrl,
          tiktokUserName: this.fd.username
        }).then(function (res) {
          console.log('acc true')
          return res
        })
          .catch(function (err) {
            console.log('acc false')
          })
        this.$store.commit('addTikTokAccounts', {
          accountUrl: this.fd.accountUrl,
          tiktokUserName: this.fd.username,
          _id: item.data.payload.tiktokAccount.tikTokAccounts[item.data.payload.tiktokAccount.tikTokAccounts.length - 1]._id
        })
      } else {
        item = await this.$axios.post(`${process.env.LINK}/api/admin/add/account/${this.account._id}`, {
          accountUrl: this.fd.accountUrl,
          tiktokUserName: this.fd.username
        }).then(function (res) {
          console.log('acc true')
          return res
        })
          .catch(function (err) {
            console.log('acc false')
          })
        this.$store.commit('addTikTokAccountsAdmin', [{
          accountUrl: this.fd.accountUrl,
          tiktokUserName: this.fd.username
          // _id: item.data.payload.tiktokAccount.tikTokAccounts[item.data.payload.tiktokAccount.tikTokAccounts.length - 1]._id
        }, this.userNumber])
      }
      this.$store.commit('changeModal', 'account')
    }
  }
}

</script>

<style lang="scss" scoped>
    .acc-modal {
        z-index: 421;
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
            max-width: 625px;
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

    .form-submit-button {
        margin-top: 20px;
        font-family: "Gilroy";
        font-weight: 600;
    }
</style>
