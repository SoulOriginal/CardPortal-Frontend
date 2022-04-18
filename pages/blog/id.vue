<template>
  <div class="wh100 pa-3">
    <!-- {{ data.userID }} -->
    <v-card class="mx-auto mt-2 mb-2" max-width="2560">
      <v-list-item three-line>
        <v-list-item-content>
          <div class="mb-4">views: {{ data && data.views }}</div>
          <v-list-item-title class="text-h5 mb-1">
            {{ data && data.title }}
          </v-list-item-title>
          <v-list-item-subtitle> {{ data && data.body }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-actions>
        <v-btn outlined rounded text> Button </v-btn>
      </v-card-actions>

      <v-row>
        <v-col cols="12" md="9" lg="9">
          <!-- @scroll="handleScrollChat" -->
          <div class="chat-wrapper" ref="chat">
            <div
              class="chat-wrapper__msg"
              v-for="(message, index) in messages"
              :key="`message-${index}`"
            >
              <v-row justify="center" no-gutters>
                <p v-if="chekDate(index)" class="text-center ma-2">
                  <v-chip>
                    {{ $moment(message.create_date).format("D MMM") }}</v-chip
                  >
                </p>
              </v-row>
              <v-row justify="center">
                <p v-if="message.name === `admin`" class="text-center ma-2">
                  <v-chip> {{ message.text }}</v-chip>
                </p>

                <v-col class="msg-wrapper" v-else>
                  <v-row class="msg">
                    <div class="d-flex justify-center align-end">
                      <v-avatar
                        class="ma-1"
                        :color="chekPrevUser(index) ? `red` : null"
                        size="37"
                      >
                        <span class="white--text">USR</span>
                      </v-avatar>
                    </div>

                    <v-col
                      class="rounded-lg"
                      :class="
                        message.userID == user._id ? `owner` : ` another-user `
                      "
                    >
                      <!-- <span class="font-weight-bold">{{ message.name }} </span> -->
                      <!-- :class="message.userID == user._id ? `owner` : ``" -->
                      <!-- <v-tooltip bottom open-delay="300">
                        <template v-slot:activator="{ on, attrs }">
                          <time
                            v-bind="attrs"
                            v-on="on"
                            style="font-size: 0.75rem; line-height: 1.375rem"
                            aria-label="15 февраля 2022 г., 5:19"
                            id="message-timestamp-942998465846333511"
                            :datetime="message.create_date"
                            ><i class="separator-AebOhG" aria-hidden="true">
                              — </i
                            >{{
                              $moment(message.create_date).format("LT")
                            }}</time
                          >
                        </template>
                        <span
                          >{{ $moment(message.create_date).format("L hh:mm") }}
                        </span>
                      </v-tooltip> -->
                      <p class="mb-0">
                        {{ message.text }}
                      </p>

                      <div class="ma-0 pa-0">
                        <v-tooltip bottom open-delay="300">
                          <template v-slot:activator="{ on, attrs }">
                            <time
                              v-bind="attrs"
                              v-on="on"
                              style="font-size: 0.75rem; line-height: 1.375rem"
                              aria-label="15 февраля 2022 г., 5:19"
                              id="message-timestamp-942998465846333511"
                              :datetime="message.create_date"
                              ><i class="separator-AebOhG" aria-hidden="true">
                                {{ $moment(message.create_date).format("LT") }}
                              </i></time
                            >
                          </template>
                          <span
                            >{{
                              $moment(message.create_date).format("L hh:mm")
                            }}
                          </span>
                        </v-tooltip>
                      </div>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </div>
          </div>
          <div class="chat">
            <v-form ref="form" class="chat__form" @submit.prevent="send">
              <v-text-field
                class="chat__form_input"
                v-model="text"
                label="Message..."
                hide-details
                dark
                filled
                :rules="rules"
                append-icon="mdi-send-circle-outline"
                @input="typing"
                @click:append="send"
                @blur="resetValidation"
              />
            </v-form>
          </div>
        </v-col>
        <v-col cols="12" md="3" lg="3">
          <div class="text-center">online Users Now chat</div>
          <v-avatar
            v-for="(user, index) in users"
            :key="`users-${index}`"
            class="ma-1"
            :color="user.typingStatus ? `blue` : `red`"
          >
            <span class="white--text text-h5">USR</span>
          </v-avatar>
        </v-col>
      </v-row>
    </v-card>
    <!-- <div class="chat-wrapper">
      <div ref="chat" class="chat">
        <v-row
          justify="center"
          no-gutters
          v-for="(message, index) in messages"
          :key="`message-${index}`"
          :message="message"
        >
          <p
            v-if="message.name === `admin`"
            class="text-center font-italic system red"
          >
            {{ message.text }}
          </p>
          <v-col class="msg-wrapper" v-else>
            <v-row
              no-gutters
              justify="space-between"
              class="msg"
              :class="message.userID == user._id ? `owner` : ``"
            >
              <v-col>
                <span class="font-weight-bold">{{ message.name }}</span>
                <p class="mb-0">
                  {{ message.text }}
                </p>
              </v-col>
              <v-col cols="auto">
                <span class="msg__date ml-3">{{ message.time }}</span>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
        <div v-if="typingUsers.length" class="chat__typing">
          <v-card
            v-for="(typingUser, index) in typingUsers"
            :key="`typingUser-${index}`"
            class="chat__typing-user"
          >
            {{ typingUser.name }} is typing...
          </v-card>
        </div>
      </div>

      <div class="chat__form">
        <v-form ref="form" @submit.prevent="send">
          <v-text-field
            v-model="text"
            label="Message..."
            outlined
            :rules="rules"
            append-icon="mdi-send-circle-outline"
            @input="typing"
            @click:append="send"
            @blur="resetValidation"
          />
        </v-form>
      </div>
      <div v-if="typingUsers.length" class="chat__typing">
        <v-card
          v-for="(typingUser, index) in typingUsers"
          :key="`typingUser-${index}`"
          class="chat__typing-user"
        >
          {{ typingUser.name }} is typing...
        </v-card>
      </div>
    </div> -->
  </div>
</template>

<script>
import { mapGetters, mapState, mapActions } from "vuex";
export default {
  layout: "home",
  data() {
    return {
      data: null,
      refTest: undefined,
      text: "",
      skip: 25,
      prevDate: null,
      rules: [(v) => !!v || "Text is required"],
    };
  },

  async fetch() {
    const { data } = await this.$axios.get(`/blog/${this.$route.params.id}`);
    console.log(data);
    this.data = data.doc;
  },
  fetchOnServer: true,
  computed: {
    ...mapState("socket", {
      messages: (state) => state.messages,
      users: (state) => state.users,
      socket_user: (state) => state.user,
    }),
    ...mapState("auth", {
      user: (state) => state.user,
    }),
    ...mapGetters({
      typingUsers: "socket/typingUsers",
      typingStatus: "socket/typingStatus",
    }),
  },
  watch: {
    messages() {
      setTimeout(() => {
        if (this.$refs.chat) {
          this.$refs.chat.scrollTop = this.$refs.chat.scrollHeight;
        }
      }, 0);
    },
  },
  methods: {
    ...mapActions({
      createMessage: "socket/createMessage",
      setTypingStatus: "socket/setTypingStatus",
      createUser: "socket/createUser",
      joinRoom: "socket/joinRoom",
      leftRoom: "socket/leftRoom",
      uploadMassages: "socket/uploadMassages",
    }),
    handleScrollChat(element) {
      // console.log("offsetWidth", element.target.offsetWidth);
      // console.log("scrollTop", element.target.scrollTop);
      // console.log("scrollHeight", element.target.scrollHeight);
      if (element.target.scrollTop <= 0) {
        // this.hasScrolledToBottom = true;
        console.log("hasScrolledToBottom", true);
        this.skip = this.skip + 25;
        this.uploadMassages(this.skip);
      }
      // target.offsetWidth
    },
    send() {
      if (this.$refs.form.validate()) {
        this.createMessage({
          msg: this.text,
          userID: this.user._id,
          postID: this.$route.params.id,
        });
        this.text = "";

        // this.setTypingStatus(false);
        this.resetValidation();
      }
    },
    chekDate(index) {
      if (index == 0) return false;
      if (index == this.messages.length - 1) return false;

      const prevDate = this.$moment(
        this.messages[index - 1].create_date
      ).format("D");
      const nowDate = this.$moment(this.messages[index].create_date).format(
        "D"
      );
      if (prevDate !== nowDate) return true;
    },
    chekPrevUser(index) {
      if (index == 0) return true;
      const isLast = this.messages.length;
      if (index == isLast) return true;
      const prevUserID = this.messages[index - 1];
      const nextUserID = this.messages[index + 1];
      const nowUserID = this.messages[index];
      if (nowUserID && nowUserID.name == "admin") return false;
      if (nextUserID && nextUserID.name == "admin") return false;

      return prevUserID.userID !== nowUserID.userID ? true : false;
      // if (prevUserID.userID !== nowUserID.userID) {
      //   return true;
      // } else {
      //   return false;
      // }
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    typing() {
      if (!this.typingStatus) {
        // this.setTypingStatus(true);
      }
    },
  },
  beforeDestroy() {
    this.leftRoom();
  },
  async created() {
    if (Object.keys(this.socket_user).length !== 0) {
      await this.leftRoom();
    }

    await this.createUser({
      name: this.user.email,
      userID: this.user._id,
      room: this.$route.params.id,
      typingStatus: false,
    });
    await this.joinRoom({
      name: this.user.email,
    });
  },
};
</script>
<style scoped lang="scss">
.wh100 {
  width: 100%;
  height: 100%;
}
.chat-wrapper {
  height: 100%;
  width: 100%;
  position: relative;
  overflow: auto;
  max-height: 50vh;
}
.chat-wrapper::-webkit-scrollbar {
  width: 20px;
}

.chat-wrapper::-webkit-scrollbar-track {
  background-color: transparent;
}

.chat-wrapper::-webkit-scrollbar-thumb {
  background-color: #d6dee1;
  border-radius: 20px;
  border: 6px solid transparent;
  background-clip: content-box;
}

.chat-wrapper::-webkit-scrollbar-thumb:hover {
  background-color: #a8bbbf;
}
.chat {
  &__form {
    &_input {
      background: #40444b;
      color: white;
      border-radius: 9px;
    }
  }
}

.chat__typing {
  position: absolute;
  display: flex;
  bottom: 50px;
}

.chat__typing-user:not(first-child) {
  margin-left: 15px;
}
.system {
  margin-bottom: 1rem;
  color: #fff;

  p {
    margin-bottom: 1rem;
  }
}

.msg-wrapper {
  display: flex;
  flex-direction: column;
}

.msg {
  padding: 0.2rem;
  // width: 60%;
  // box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
  border-radius: 4px;
  // background: #1976d2;
  // color: #fff;
  position: relative;
  word-break: break-all;
  margin-top: -26px !important;
  &__date {
    text-decoration: underline;
  }
}

.owner {
  background: rgb(135, 116, 225);
  width: fit-content !important;
  max-width: fit-content;
  color: rgb(255, 255, 255);
  // align-self: flex-end;
}
.another-user {
  background: rgb(69, 68, 72);
  width: fit-content !important;
  max-width: fit-content;
  color: rgb(255, 255, 255);
  // align-self: flex-end;
}
@media (max-width: 400px) {
  .msg {
    width: 90%;
  }
}
</style>
