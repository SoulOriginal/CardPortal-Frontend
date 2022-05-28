<template>
  <div class="card-p-bacs" aria-hidden="true">
    <div class="card-p-bac" v-for="(img, index) in img_urls" :key="index">
      <v-img :src="img" :lazy-src="img" width="20" height="20"></v-img>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img_urls: [
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/TikTok_Icon_Black.svg/2048px-TikTok_Icon_Black.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/VK_Compact_Logo_%282021-present%29.svg/2048px-VK_Compact_Logo_%282021-present%29.svg.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Instagram_logo_2016.svg/768px-Instagram_logo_2016.svg.png",
        "https://cdn3.iconfinder.com/data/icons/social-media-chamfered-corner/154/telegram-512.png",
        "https://i.pinimg.com/originals/d3/d1/75/d3d175e560ae133f1ed5cd4ec173751a.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Facebook_Messenger_logo_2020.svg/2048px-Facebook_Messenger_logo_2020.svg.png",
        "https://www.facebook.com/images/fb_icon_325x325.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png",
        "https://www.iconpacks.net/icons/2/free-twitter-logo-icon-2429-thumb.png",
        "https://icon-library.com/images/png-twitter-icon/png-twitter-icon-27.jpg",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Google_Plus_icon_%282015-2019%29.svg/2048px-Google_Plus_icon_%282015-2019%29.svg.png",
        "https://cdn3.iconfinder.com/data/icons/picons-social/57/80-google-plus-512.png",
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/LinkedIn_icon_circle.svg/2048px-LinkedIn_icon_circle.svg.png",
      ],
    };
  },
};
</script>

<style>
.card-p-bac {
  color: #fff;
  font-size: 1em;
  font-family: Arial, sans-serif;
  text-shadow: 0 0 5px #000;
  opacity: 0.3;
  pointer-events: none;
  z-index: 0;
}

@-webkit-keyframes card-p-bacs-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@-webkit-keyframes card-p-bacs-shake {
  0%,
  100% {
    -webkit-transform: translateX(0);
    transform: translateX(0);
  }
  50% {
    -webkit-transform: translateX(80px);
    transform: translateX(80px);
  }
}
@keyframes card-p-bacs-fall {
  0% {
    top: -10%;
  }
  100% {
    top: 100%;
  }
}
@keyframes card-p-bacs-shake {
  0%,
  100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(80px);
  }
}
.card-p-bac {
  position: fixed;
  top: -10%;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: default;
  -webkit-animation-name: card-p-bacs-fall, card-p-bacs-shake;
  -webkit-animation-duration: 10s, 3s;
  -webkit-animation-timing-function: linear, ease-in-out;
  -webkit-animation-iteration-count: infinite, infinite;
  -webkit-animation-play-state: running, running;
  animation-name: card-p-bacs-fall, card-p-bacs-shake;
  animation-duration: 10s, 3s;
  animation-timing-function: linear, ease-in-out;
  animation-iteration-count: infinite, infinite;
  animation-play-state: running, running;
}
.card-p-bac:nth-of-type(0) {
  left: 1%;
  -webkit-animation-delay: 0s, 0s;
  animation-delay: 0s, 0s;
}
.card-p-bac:nth-of-type(1) {
  left: 10%;
  -webkit-animation-delay: 1s, 1s;
  animation-delay: 1s, 1s;
}
.card-p-bac:nth-of-type(2) {
  left: 20%;
  -webkit-animation-delay: 6s, 0.5s;
  animation-delay: 6s, 0.5s;
}
.card-p-bac:nth-of-type(3) {
  left: 30%;
  -webkit-animation-delay: 4s, 2s;
  animation-delay: 4s, 2s;
}
.card-p-bac:nth-of-type(4) {
  left: 40%;
  -webkit-animation-delay: 2s, 2s;
  animation-delay: 2s, 2s;
}
.card-p-bac:nth-of-type(5) {
  left: 50%;
  -webkit-animation-delay: 8s, 3s;
  animation-delay: 8s, 3s;
}
.card-p-bac:nth-of-type(6) {
  left: 60%;
  -webkit-animation-delay: 6s, 2s;
  animation-delay: 6s, 2s;
}
.card-p-bac:nth-of-type(7) {
  left: 70%;
  -webkit-animation-delay: 2.5s, 1s;
  animation-delay: 2.5s, 1s;
}
.card-p-bac:nth-of-type(8) {
  left: 80%;
  -webkit-animation-delay: 1s, 0s;
  animation-delay: 1s, 0s;
}
.card-p-bac:nth-of-type(9) {
  left: 90%;
  -webkit-animation-delay: 3s, 1.5s;
  animation-delay: 3s, 1.5s;
}
.card-p-bac:nth-of-type(10) {
  left: 25%;
  -webkit-animation-delay: 2s, 0s;
  animation-delay: 2s, 0s;
}
.card-p-bac:nth-of-type(11) {
  left: 65%;
  -webkit-animation-delay: 4s, 2.5s;
  animation-delay: 4s, 2.5s;
}
</style>
