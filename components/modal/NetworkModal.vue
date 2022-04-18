<template>
  <div class="tarif-modal">
    <div class="modal">
      <div class="header">
        <div class="title mb-20">
          {{ editRecord.title ? 'Изменить соцсеть' : 'Добавить соцсеть' }}
        </div>
        <button class="icon-button" @click.prevent="$store.commit('changeModal', 'social')">
          <img src="~assets/svg/close_icon.svg" alt="">
        </button>
      </div>
      <div class="content">
        <div :class="['text-field', 'mb-20']">
          <div class="text-title mb-10">
            Название
          </div>
          <input v-model="fd.Name" type="text" placeholder="Введите название">
        </div>
        <div :class="['text-field', 'mb-20']">
          <div class="text-title mb-10">
            Ссылка
          </div>
          <input v-model="fd.Link" type="text" placeholder="Вставьте ссылку">
        </div>
        <div :class="['text-field', 'mb-20']">
          <div v-if="!fd.Icon">
            <div class="text-title mb-10">
              Загрузите иконку для соцсети
            </div>
            <div class="fake-box">
              <input ref="svgIcon" class="network-file" type="file" accept="image/*" @change="onSvgLoad">
              <div class="network-file-fake" type="text" />
            </div>
          </div>
          <img v-if="fd.Icon" :src="fd.Icon" alt="">
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
    editRecord: {
      type: Object,
      default: () => ({
        Name: ''
      })
    }
  },
  data () {
    return {
      fd: {
        Icon: '',
        Name: '',
        Link: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      if (this.editRecord.Name) {
        let resp = await this.$http.post(`${process.env.LINK}/api/admin/social/update/${this.editRecord._id}`, this.fd)
        resp = await resp.json()
        this.$emit('edit', {
          ...this.editRecord,
          ...this.fd
        })
      } else {
        let resp = await this.$http.post(`${process.env.LINK}/api/admin/social/create`, this.fd)
        resp = await resp.json()

        this.$store.commit('addSocialNetwork', this.fd)
      }

      this.$store.commit('changeModal', 'social')
    },
    async onSvgLoad (e) {
      if (!e || !e.target || !e.target.files || e.target.files.length === 0) {
        return
      }

      console.log(e.target.files[0].name)
      const fileName = e.target.files[0].name
      const lastDot = fileName.lastIndexOf('.')
      const ext = fileName.substring(lastDot + 1)
      if (ext !== 'svg') {
        // show notification
        this.$notify({ group: 'main', text: 'Heyy !!!', type: 'error' })
      } else {
        const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(file)
          reader.onload = () => resolve(reader.result)
          reader.onerror = error => reject(error)
        })

        let img = await toBase64(e.target.files[0])
        this.fd.Icon = img
        console.log(img)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
    background-color: #fff;
    box-shadow: 0px 0px 15px rgba(33, 33, 33, 0.0521744);
    border-radius: 20px;
    padding: 20px;
    max-width: 625px;
    flex: 1 1 100%;

    .header {
      display: flex;
      justify-content: space-between;

      .title {
        font-size: 24px;
        font-weight: 600;
        line-height: 29px;
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
  }
</style>
