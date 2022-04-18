<template>
  <div class="acc-modal" v-on:click.self="$store.commit('changeModal', 'comment')">
    <div class="modal">
      <div class="header">
        <div class="title mb-20">
          {{ $t('addCommentButton') }}
        </div>
        <button class="icon-button" @click="$store.commit('changeModal', 'comment')">
          <img src="~assets/svg/close_icon.svg" alt="">
        </button>
      </div>
      <div class="content">
        <div :class="['text-field', 'mb-10']">
          <input v-model="fd.comment_title" class="comment-area_mini" type="text" :placeholder="$t('nameOfList')" />
        </div>
        <div :class="['text-field', 'mb-20']">
          <div class="red text-title mb-10"> 
            {{ $t('commentHelpTitle') }} 
          </div>
          <textarea v-model="fd.comment" class="comment-area" type="text" :placeholder="$t('commentButton')" />
        </div>
        <div class="mes" v-if="fd.error">{{fd.error}}</div> 
        <button class="form-submit-button" @click.prevent="onSubmit">
          {{ $t('saveButton') }}
        </button>
      </div>
    </div>
  </div>
</template>
  
<script>
import ClickOutside from 'vue-click-outside'
export default {
  data () {
    return {
      fd: {
        comment_title: '',
        comment: '',
        error: ''
      }
    }
  },  
  methods: {
    async onSubmit () {
      if (!~this.fd.comment.indexOf(";")){
        this.fd.error = "Вы не указали ни одного ;"
        return;
      }
      if(this.fd.comment_title.length == 0){
        this.fd.error = "Слишком короткое название списка "
        return; 
      }
      let item = await this.$axios.post(`${process.env.LINK}/api/user/add/comments`, {
        comment: this.fd.comment,
        title:this.fd.comment_title
      }).then(function (res) {
        console.log('nice cooment')
        return res
      })
        .catch(function (err) {
          console.log(err)
        })
      console.log(item)
      this.$store.commit('addComment', {
        comments: this.fd.comment,
        comments_title:this.fd.comment_title,
        _id: item.data.payload.tiktokComment.comments[item.data.payload.tiktokComment.comments.length - 1]._id
      })
      this.$store.commit('changeModal', 'comment')
    },
    toggle () {
      this.$store.commit('changeModal', 'comment')
    //  this.$store.state.modal.comment =false
    },
 
    hide () {
    //    this.$store.commit('changeModal', 'comment') 
    console.log(1)
    // this.$store.state.modal.comment =false
        // this.$store.commit('changeModalFalse', 'comment')
    }
  },
    mounted () {
    this.popupItem = this.$el
  },
    directives: {
    ClickOutside
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
  .comment-area_mini{
    width: 100%;
    max-height: 50px;
    height: 50px;
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

    .form-submit-button {
        margin-top: 20px;
        font-family: "Gilroy";
        font-weight: 600;
    }
</style>
