<template>
  <div class="acc-modal">
    <div class="modal">
      <div class="header">
        <div class="title mb-20">
          Добавить видео
        </div>
        <button class="icon-button" @click="$store.commit('changeModal', 'video')">
          <img src="~assets/svg/close_icon.svg" alt="">
        </button>
      </div>
      <div class="content">
        <div :class="['text-field', 'mb-20']">
          <div class="text-title mb-10">
            Название видео
          </div>
          <input v-model="fd.videoName" type="text" placeholder="Название видео">
        </div>
        <div :class="['text-field', 'mb-20']">
          <div class="text-title mb-10">
            Ссылка на видео
          </div>
          <input v-model="fd.videoUrl" type="text" placeholder="Вставьте ссылку">
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
  data () {
    return {
      fd: {
        videoUrl: '',
        videoName: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      let item = await this.$axios.post(`${process.env.LINK}/api/user/add/video`, {
        video: this.fd.videoUrl,
        videoName: this.fd.videoName
      }).then(function (res) {
        console.log('video tru')
        return res
      })
        .catch(function (err) {
          console.log('video false')
        })
      this.$store.commit('addTikTokVideo', {
        videoUrl: this.fd.videoUrl,
        videoName: this.fd.videoName,
        _id: item.data.payload.tiktokVideo.tikTokVideos[item.data.payload.tiktokVideo.tikTokVideos.length - 1]._id
      })

      this.$store.commit('changeModal', 'video')
    }
  }
}
</script>

<style lang="scss" scoped>
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
            min-width: 625px;
            z-index: 1000;

            .header {
                display: flex;
                justify-content: space-between;

                .title {
                    font-size: 24px;
                    font-weight: 600;
                    line-height: 29px;
                }
            }

            .content {
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
