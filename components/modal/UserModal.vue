<template>
  <div class="user-modal">
    <div v-if="!$store.state.modal.account" class="modal">
      <div class="header-abc row-static">
        <div class="title row-start align-items-center mb-20">
          <img style="width: 45px;height: 45px;" class="title-img" src="~assets/images/profile.png" alt="">
          <div class="inf column-start">
            <span>{{ account.userName }}</span>
            <span class="email">{{ account.email }}</span>
          </div>
        </div>
        <button class="icon-button" @click.prevent="$emit('close')">
          <img src="~assets/svg/close_icon.svg" alt="">
        </button>
      </div>
      <div class="section">
        <div class="title">
          <h3>
            Группы
          </h3>
        </div>
        <div class="select-row mb-20 row-start align-items-center">
          <!-- <button @click="makeAdmin">make admin</button>
          <button @click="makeUser">make user</button>
          <button @click="blockUser">block user</button>
          <button @click="makeSuperadmin">superadmin</button> -->
          <custom-select :options="roles" :default="computeDefault()" class="pr-15" @input="onRoleChange" />
          <div>
            <button class="form-submit-button" @click="onSaveRole">
              Сохранить
            </button>
          </div>
        </div>
      </div>
      <div class="section">
        <div class="title">
          <h3>
            Баланс
          </h3>
        </div>
        <div class="row-2 mb-20">
          <div class="pr-15">
            <div :class="['text-field']">
              <input v-model="fd.moneyAmount" type="text" placeholder="250.00">
            </div>
          </div>
          <div>
            <button class="form-submit-button" @click.prevent="changeMoney">
              Изменить
            </button>
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button class="form-submit-button" :class="account.status === 'BLOCKED' ? 'green' :'red'" @click="onUserBlock">
          {{ account.status === 'BLOCKED' ? 'Разблокировать пользователя' : 'Заблокировать пользователя' }}
        </button>
      </div>
    </div>
    <add-acc-modal v-if="$store.state.modal.account" :account="account" :user-number="userNumber" />
  </div>
</template>

<script> 
import AddAccModal from "~/components/modal/AddAccModal.vue";
export default {
  props: { 
    userNumber: {
      type: Number,
      default: () => -1
    }
  },
  components:{
    "add-acc-modal":AddAccModal
  },
  async fetch () {
    let resp = await this.$http.post(`${process.env.LINK}/api/getRoles`)
    resp = await resp.json()
    this.getRoles = resp.payload.slice(0, 2)
  },
  data () {
    return {
      fd: {
        moneyAmount: ''
      },
      getRoles: [],
      selectedRole: '',
      isNewAcc: false,
      isEditing: false
    }
  },
  computed: {
    account () {
      return this.$store.state.users[this.userNumber]
    },
    roles () {
      return this.getRoles.map((el, index) => {
        return {
          name: el === 'ADMIN' ? 'Администратор' : 'Пользователь',
          value: index
        }
      })
    }
  },
  created () {
    this.fd.moneyAmount = this.account.moneyAmount
  },
  methods: {
    async onUserBlock () {
      if (confirm('You are going to BLOCK user. Are you sure?')) {
        let resp = await this.$http.post(`${process.env.LINK}/api/role/block/${this.account._id}`)
        resp = await resp.json()
        console.log(resp)
        this.$store.commit('changeUserBlock', this.account)
      }
    },
    computeDefault () {
      if (this.account.status === 'USER') {
        return {
          name: 'Пользователь'
        }
      } else {
        return {
          name: 'Администратор'
        }
      }
    },
    onRoleChange (value) {
      this.selectedRole = value.name
    },
    async makeSuperadmin () {
      let resp = await this.$http.post(`${process.env.LINK}/api/role/superAdmin`)
      resp = await resp.json()
      console.log(resp)
    },
    async makeAdmin () {
      let resp = await this.$http.post(`${process.env.LINK}/api/role/admin/${this.account._id}`)
      resp = await resp.json()
      this.$store.commit('changeUserRole', { userNumber: this.userNumber, role: 'ADMIN' })
      return resp
    },
    async blockUser () {},
    async makeUser () {
      let resp = this.$http.post(`${process.env.LINK}/api/role/user/${this.account._id}`)
      this.$store.commit('changeUserRole', { userNumber: this.userNumber, role: 'USER' })
      return resp
    },
    async onSaveRole () {
      if (this.selectedRole === 'Администратор') {
        let resp = await this.makeAdmin()
        console.log(resp)
        this.$notify({ group: 'main', text: 'Done !!!', type: 'success' })
      }
      if (this.selectedRole === 'Пользователь') {
        let resp = await this.makeUser()
        console.log(resp)
        this.$notify({ group: 'main', text: 'Done !!!', type: 'success' })
      }
    },
    async changeMoney () {
      if (confirm(`Change user money to ${this.fd.moneyAmount} ?`)) {
        this.$axios.post(`${process.env.LINK}/api/admin/balance/${this.account._id}`, {
          balance: this.fd.moneyAmount
        })
          .then(function () {
            console.log('balance: nice')
          })
          .catch(function () {
            console.log('balance: error')
          })
        this.$store.commit('changeMoney', {
          money: this.fd.moneyAmount,
          userNumber: this.userNumber
        })
        this.$notify({ group: 'main', text: 'Done !!!', type: 'success' })
      }
    },
    async onAccDelete (item, index) {
      if (confirm('Are you sure?')) {
        this.$axios.post(`${process.env.LINK}/api/admin/delete/account/${item._id}`, {
          id: this.account._id
        })
          .then(function () {
            console.log('nice')
          })
          .catch(function (err) {
            console.log(err)
          })
        this.$store.commit('removeTikTokAccauntAdmin', {
          index: this.userNumber,
          accountIndex: index
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .header-abc{
      justify-content: space-between;
        text-transform: none;
    }
    .title{
          font-size: 24px;
    font-weight: 600;
    line-height: 29px;
    color: #212121;
    }
  .green{
    background: #0ED833;
    color: #212121;
  }
  .red{
    background: #F33333;
    color: #fff;
  }
  .form-submit-button {
    padding: 12px 10px;
    font-size: 18px;
    font-weight: 400;
    line-height: 18px;
  }
  .edit{
    border: none;
    background: none;
    color: #4C5E8C;
    font-size: 18px;
    line-height: 21px;
    outline: transparent;
    cursor: pointer;
    &:focus,
    &:active {
      outline: transparent;
    }
  }
  .add-btn {
    min-width: 173px;
    min-height: 47px;
    margin-bottom: 10px;
  }
  .acc-button {
    margin-bottom: 10px;
  }
  .select-field {
    min-width: 276px;
  }
  .select-row {
    @media (max-width: 576px) {
      flex-direction: column;
      align-items: flex-start;
      button {
        margin-top: 10px;
      }
    };
  }
  .user-modal {
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .3);



    .section {
      padding: 20px 20px 0;
      border-bottom: 1px solid #D3D7E3;

      .title {
        margin-bottom: 18px;
        h3 {
          font-size: 24px;
          font-weight: 600;
          line-height: 29.4px;
        }
      }
    }
    &-actions {
      padding: 20px 30px;
    }
  }
  
</style>
