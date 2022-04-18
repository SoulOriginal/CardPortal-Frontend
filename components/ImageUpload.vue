<template>
  <client-only placeholder="loading...">
    <file-upload
      v-if="files.length !== maxImg"
      :diactive="true"
      :add-index="true"
      :size="1024 * 1024"
      :timeout="600 * 1000"
      :progress="0.05"
      extensions="gif,jpg,jpeg,png,webp"
      accept="image/png,image/gif,image/jpeg,image/webp"
      class="offer-photo-manager"
      :multiple="maxImg == 1 ? false : true"
      :drop="true"
      :maximum="maxImg"
      chunk-enabled
      :drop-directory="false"
      v-model="files"
      @input-filter="inputFilter"
      @input-file="inputFile"
      ref="upload"
    >
      <v-icon color="black" size="40">mdi-camera-burst</v-icon>
    </file-upload>
    <!-- <div class="preview__image" v-if="seleced_img_url">
          <img :src="seleced_img_url" alt="" />
        </div> -->

    <!-- <v-col class="12"> -->
  </client-only>
</template>

<script>
// if (process.browser) {
//   import VueUploadComponent from "vue-upload-component";
// }

export default {
  components: {
    [process.browser && "file-upload"]: () => import("vue-upload-component"),
  },
  data() {
    return {
      drag: false,
      files: [],
      seleced_img_url: null,
      edit: false,
    };
  },
  props: {
    maxImg: {
      type: Number,
      default: 0,
    },
    image_count: {
      type: Number,
      default: null,
    },
    editId: {
      default: null,
    },
    userID: {
      default: null,
    },
    avtivated: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    //   onSave() {
    //     if (this.files.length >= 1) {
    //       this.$emit("save", this.files, this.edit);
    //     } else {
    //       this.$emit("save", null, this.edit);
    //     }
    //   },
    //   saveUpdatedOrder: function (e) {
    //     // console.log("saving...");
    //     // console.log(e);
    //   },
    //   del_file(index) {
    //     this.files.splice(index, 1);
    //     this.edit = true;
    //   },
    //   update_drag(element) {
    //     this.edit = true;
    //     // console.log(element);
    //   },
    //   previewFiles(event) {
    //     // console.log(event.target.files);
    //   },
    //   sort() {
    //     this.list = this.list.sort((a, b) => a.order - b.order);
    //   },
    inputFile(newFile, oldFile, prevent) {
      this.$nextTick(function () {
        this.edit = true;
      });
    },
    //   async saveInfo() {
    //     if (this.files.length >= 1) {
    //       let l_files = [];
    //       var bodyFormData = new FormData();
    //       let i = 0;
    //       this.files.forEach((element) => {
    //         // l_files.push(element.file);
    //         bodyFormData.append("files_" + i, element.file);
    //         i++;
    //       });
    //     } else {
    //       console.log(`err`);
    //     }
    //   },
    inputFilter(newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        if (!/\.(gif|jpg|jpeg|png|webp)$/i.test(newFile.name)) {
          this.alert("Your choice is not a picture");
          return prevent();
        }
      }
      if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
        newFile.url = "";
        let URL = window.URL || window.webkitURL;
        if (URL && URL.createObjectURL) {
          newFile.url = URL.createObjectURL(newFile.file);
        }
        console.log(newFile);
      }
    },
    // },
    // watch: {
    //   avtivated: function () {
    //     console.log(this.files);
    //     this.onSave();
    //   },
    //   image_count: {
    //     async handler(newVal) {
    //       if (newVal === -1) return;
    //       if (newVal !== null) {
    //         if (!this.userID) return;
    //         if (!this.editId) return;
    //         for (let index = 0; index <= newVal; index++) {
    //           const response = await fetch(
    //             `userimages/${this.userID}/${this.editId}/${index}.png`
    //           );
    //           const blob = await response.blob();
    //           this.files.push({
    //             fileObject: true,
    //             type: "image/png",
    //             file: new File([blob], Math.floor(Math.random() * 9999)),
    //             id: Math.floor(Math.random() * 9999),
    //             url: `userimages/${this.userID}/${this.editId}/${index}.png`,
    //           });
    //         }
    //       }
    //     },
    //     immediate: true,
    //   },
  },
};
</script>

<style lang="scss" scoped>
.preview {
  z-index: 999999999999999 !important;
}
@media (min-width: 960px) {
  .preview {
    &__img {
      max-height: 400px;
    }
  }
}

.grid {
  display: inline-grid;
  grid-template-columns: repeat(3, auto);
  gap: 7px;
  transition: transform 2s;
}

.cell {
  transition: transform 0.5s;
  position: relative;
  width: 110px;
  height: 90px;
  border-radius: 4px;
  background-color: transparent;
  pointer-events: auto !important;
}
.dragclass {
  cursor: pointer;
  width: 100%;
  height: 100%;
  border-radius: 4px;

  position: relative;
  &__img {
    width: 100%;
    height: 100%;
    border-radius: 0.5rem;
    -o-object-fit: cover;
    object-fit: cover;
    pointer-events: none !important;
  }
  &__main {
    position: absolute;
    color: black;
    left: 0;
    bottom: 0;
    padding: 3px 10px 3px 10px;
    border-radius: 6px;
    font-size: 14px;
    background: #c8ebfb;
    text-align: center;
  }
  &__del {
    border-radius: 0.5rem;
    display: block;
    position: absolute;
    background: rgba(0, 0, 0, 0.507);
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: none;
    align-items: center;
    justify-content: center;
    &--icon {
      border: 2px solid white;
      border-radius: 50%;
      padding: 5px;
    }
  }
  &:hover {
    .dragclass__del {
      display: flex;
      justify-content: space-around;
    }
  }
}

.offer-photo-manager {
  width: 100%;
  height: 170px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  cursor: pointer;
  border: 2.5px dashed black;
  border-radius: 10px;
}
</style>
