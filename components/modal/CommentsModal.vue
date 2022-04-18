<template>
  <div class="acc-modal" v-on:click.self="$store.commit('changeModal', 'edit_comments')">
    <div class="modal">
      <div class="header">
        <div class="title mb-20"> {{ $t('editCommentsButton') }}</div>
        <button
          class="icon-button"
          @click="$store.commit('changeModal', 'edit_comments')"
        >
          <img src="~assets/svg/close_icon.svg" alt="" />
        </button>
      </div>
      <div class="content">
        <div :class="['text-field', 'mb-20']">
          <div class="text-title mb-10"> {{ $t('commentButton') }}</div>
        </div>

        <div v-for="com in comments" :key="com._id">
          <h4 class="comment-tille">{{ com.comments_title }}</h4>
          <div v-if="selected_com == com._id">
            <div class="mb-10 aquamarine flex-a">
              <div
                class="card aquamarine flex-a border"
                @click="selectComment(com._id)"
              >
                <div class="card-body">
                  {{ com.comments }}
                  <!-- <div :v-if="edit_active" :class="['text-field_two']">
                    <input class="comment-area_mini" type="text" placeholder="Название списка" />
                  </div> -->
                </div>
              </div>
              <div class="record-actions">
                <button @click="dataEdit = com;onOpenCommentsEdit = true">
                  <img src="~assets/svg/action_edit.svg" alt="" />
                </button>
              </div>
              <button class="icon-button" @click="removeComment(com._id, 1)">
                <img src="~assets/svg/close_icon.svg" alt="" />
              </button>
            </div>
          </div>

          <div v-else>
            <div class="mb-10 aquamarine flex-a">
              <div
                class="card aquamarine flex-a"
                @click="selectComment(com._id)"
              >    
                <div class="card-body">
                  {{ com.comments }}
                </div>
              </div>
              <div class="record-actions">
                <!-- <button  @click="$store.commit('changeModal', 'set_comments')">
                    <img src="~assets/svg/action_edit.svg" alt="">
                </button> -->
                <!-- <button @click="test = com._id;$store.commit('changeModal', 'set_comments');editCommentsModal()">
                  <img src="~assets/svg/action_edit.svg" alt="" />
                </button> -->
                 <button @click="dataEdit = com;onOpenCommentsEdit = true">
                  <img src="~assets/svg/action_edit.svg" alt="" />
                </button>
              </div>
              <button class="icon-button" @click="removeComment(com._id, 0)">
                <img src="~assets/svg/close_icon.svg" alt="" />
              </button>
            </div> 
          </div>
                  <!-- <set-comments-info
          v-if="com._id == test && $store.state.modal.set_comments"
          :comment-info="com"
        /> -->
        </div>
        <!-- <order-edit v-if="$store.state.modal.set_comments" :comment-info="timeCommentEdit" @edit="onEdit"   @new="(val) => { records.push(val) }"  @close="active = false; editRecord = {}" /> -->
      </div>
    </div> 
    <set-comments-info v-if="onOpenCommentsEdit"  :comment-info="dataEdit"  @close="onOpenCommentsEdit = false; dataEdit = {}" />
  </div>
</template>

<script>
import CommentsEdit from "~/components/modal/CommentsEdit.vue";
export default {
  components: { "set-comments-info": CommentsEdit },
  data() {
    return {
      onOpenCommentsEdit: false,
      timeCommentEdit: Object,
      dataEdit: {}
    };
  },
  computed: {
    comments() {
      console.log(this.$store.state.user.comments);
      return this.$store.state.user.comments;
    },
    selected_com() {
      return this.$store.state.comment_selected;
    },
  },
  methods: {
    async removeComment(item, selected) {
      this.$axios.post(`${process.env.LINK}/api/user/delete/comments/${item}`)
        .then(function () {
          // console.log("nice comment");
          // if (selected == 1) {
          //   this.$store.commit("removeComment", 0);
          //   this.$store.commit("setCommentSelected", 0);
          // }
        })
        .catch(function (err) {
          console.log(err);
        });
      if (selected == 1) {
        this.$store.commit("setCommentSelected", 0);
      }
      this.$store.commit("removeComment", item);
      console.log(this.$store.state.comment_selected);
    },
    selectComment(item) {
      this.$store.commit("setCommentSelected", item);
    },
  },
}; 
</script>
 
<style lang="scss" scoped>
.comment-tille {
  margin-left: 15px;
}
// .comment-area_mini{
//   width: 100%;
//   max-height: 50px;
//   height: 50px;
//   border: 1px solid #212121;
//   padding: 5px;
//   font-family: inherit;
//   font-size: 16px;
// }
.comment-area {
  width: 100%;
  max-height: 200px;
  height: 200px;
  border: 1px solid #212121;
  padding: 5px;
  font-family: inherit;
  font-size: 16px;
}
.text-field_two {
  width: 100%;
}
.text-field_two input {
  padding: 10px 20px;
  display: inline-block;
  width: 100%;
  border-radius: 7px;
  border: 1px solid #9db8fd;
  font-size: 18px;
  background: #f8f9fd;
}
.card {
  width: 100%;
}
.aquamarine {
  box-shadow: 0px 0px 15px rgb(33 33 33 / 5%);
  border: 2px solid white;
  // background: aquamarine;
}
.border {
  border: 2px dashed black;
}
.flex-a {
  border-radius: 20px;
  cursor: pointer;
  display: flex;
  display: -ms-flexbox;
  justify-content: space-between;
  align-items: center;
}
.red {
  background: red;
}
.card-body {
  display: flex;
  align-items: center;
  width: 100%;
}
.comment-area {
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
  background-color: rgba(0, 0, 0, 0.3);

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
  background: #f8f9fd;
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
  background: #f8f9fd;
  background: url("~assets/svg/dowload-s.svg") center no-repeat;
}

.form-submit-button {
  margin-top: 20px;
  font-family: "Gilroy";
  font-weight: 600;
}
.record-actions {
  button {
    border: none;
    cursor: pointer;
    background: none;
    &:focus {
      outline: none;
    }
  }
}
</style>
