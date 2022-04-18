<template>
  <div class="color-bac">
    <!-- <v-text-field
      label="Введите сообщение"
      outline
      v-model="text"
      @keydown.enter="send"
    /> -->
    <v-container color="#1b2431">
      <div class="scroll-reveal">
        <v-card
          v-for="(post, index) in posts"
          :key="index"
          :to="{ name: 'blog.id', params: { id: post._id } }"
          color="transparent"
          elevation="0"
        >
          <vue-timeline-update
            :date="new Date(post.create_date)"
            :title="post.title"
            :description="post.body"
            thumbnail="https://madewithnetworkfra.fra1.digitaloceanspaces.com/spatie-space-production/23800/vue-forum-4.jpg"
            color="red"
          />
        </v-card>
      </div>
    </v-container>
  </div>
</template>

<script>
import VueTimeline from "@growthbunker/vuetimeline";
import Vue from "vue";
Vue.use(VueTimeline, {
  // Specify the theme to use: dark or light (dark by default).
  theme: "dark",
});
// import socket from "~/plugins/socket.io.js";
export default {
  layout: "home",

  data() {
    return {
      posts: [],
      socket: null,
      text: "",
    };
  },

  async mounted() {
    const { data } = await this.$axios.get("blog");
    this.posts = data.blogPosts;
  },
  sockets: {
    connect: async function () {
      console.log("socket connected");
    },
    test: function (data) {
      console.log("test triggered", data);
    },
    customEmit: function (data) {
      console.log(
        'this method was fired by the socket server. eg: io.emit("customEmit", data)'
      );
    },
  },
  methods: {
    send() {
      this.$socket.emit(
        "createMessage",
        {
          text: this.text,
          id: 1,
        },
        (data) => {
          if (typeof data === "string") {
            console.error(data);
          } else {
            this.text = "";
          }
        }
      );
    },
  },
};
</script>

<style lang="scss">
.timeline {
  z-index: 1 !important;
  max-width: 80%;
  margin: 0 auto;
}
.gb-vue-timeline-update__thumbnail {
  width: 576px !important;
  height: 192px !important;
  object-fit: cover;
}
.color-bac {
  background-color: #1b2431 !important;
  width: 100%;
  height: 100%;
}
</style>
