<template>
<div data-app >
  <v-dialog v-model="visible" hide-overlay  fullscreen  transition="dialog-bottom-transition">
     <v-app-bar style="    position: fixed;" dark dense color="black" flat fixed>
      <v-btn fab small class="ml-1" @click="onExit" color="#2196F3">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-spacer />
      <v-btn dark icon class="ml-1" @click="onSave">
        <v-icon>save</v-icon>
      </v-btn>

    </v-app-bar>
      <tui-image-editor  ref="tuiImageEditor" style="margin-top:47px" :include-ui="useDefaultUI"   :options="options"></tui-image-editor>
      <!-- :include-ui="useDefaultUI" -->
  </v-dialog>
  </div>
</template>
<script>
import ImageEditor from '@toast-ui/vue-image-editor/src/ImageEditor.vue'
// import 'tui-image-editor/dist/tui-image-editor.min.css'
import 'tui-color-picker/dist/tui-color-picker.css';
import 'tui-image-editor/dist/tui-image-editor.css';
const locale_ita = {
  Load: 'Загрузить',
  Download: 'Скачать'
}
const whiteTheme = {
  'common.bi.image': 'https://uicdn.toast.com/toastui/img/tui-image-editor-bi.png',
  'common.bisize.width': '251px',
  'common.bisize.height': '21px',
  'common.backgroundImage': './img/bg.png',
  'common.backgroundColor': '#fff',
  'common.border': '1px solid #c1c1c1',
  // header
  'header.backgroundImage': 'none',
  'header.backgroundColor': 'transparent',
  'header.border': '0px',
  // load button
  'loadButton.backgroundColor': '#fff',
  'loadButton.border': '1px solid #ddd',
  'loadButton.color': '#222',
  'loadButton.fontFamily': '\'Noto Sans\', sans-serif',
  'loadButton.fontSize': '12px',
  // download button
  'downloadButton.backgroundColor': '#fdba3b',
  'downloadButton.border': '1px solid #fdba3b',
  'downloadButton.color': '#fff',
  'downloadButton.fontFamily': '\'Noto Sans\', sans-serif',
  'downloadButton.fontSize': '12px',
  // main icons
  'menu.normalIcon.color': '#8a8a8a',
  'menu.activeIcon.color': '#555555',
  'menu.disabledIcon.color': '#434343',
  'menu.hoverIcon.color': '#e9e9e9',
  'menu.iconSize.width': '24px',
  'menu.iconSize.height': '24px',
  // submenu icons
  'submenu.normalIcon.color': '#8a8a8a',
  'submenu.activeIcon.color': '#555555',
  'submenu.iconSize.width': '32px',
  'submenu.iconSize.height': '32px',
  // submenu primary color
  'submenu.backgroundColor': 'transparent',
  'submenu.partition.color': '#e5e5e5',
  // submenu labels
  'submenu.normalLabel.color': '#858585',
  'submenu.normalLabel.fontWeight': 'normal',
  'submenu.activeLabel.color': '#000',
  'submenu.activeLabel.fontWeight': 'normal',
  // checkbox style
  'checkbox.border': '1px solid #ccc',
  'checkbox.backgroundColor': '#fff',
  // rango style
  'range.pointer.color': '#333',
  'range.bar.color': '#ccc',
  'range.subbar.color': '#606060',
  'range.disabledPointer.color': '#d3d3d3',
  'range.disabledBar.color': 'rgba(85,85,85,0.06)',
  'range.disabledSubbar.color': 'rgba(51,51,51,0.2)',
  'range.value.color': '#000',
  'range.value.fontWeight': 'normal',
  'range.value.fontSize': '11px',
  'range.value.border': '0',
  'range.value.backgroundColor': '#f5f5f5',
  'range.title.color': '#000',
  'range.title.fontWeight': 'lighter',
  // colorpicker style
  'colorpicker.button.border': '0px',
  'colorpicker.title.color': '#000'
}
export default {
  components: {'tui-image-editor': ImageEditor},
  props: ['imageUrl', 'visible'],
  methods: {
    chek_data(){
        setInterval(() => {
            this.$refs.tuiImageEditor.invoke('loadImageFromURL', this.imageUrl, "SampleImage")
            return false
        }, 300);
    },
    onExit () {
      this.$emit('exit')
    },
    onSave () {
      this.$emit('save', this.$refs.tuiImageEditor.editorInstance.toDataURL())
      this.$emit('exit')
    }
  },
  created(){
    // setInterval(async ()  => {
    //     if(this.visible && this.local_visible) {
    //         let bla = await  this.$refs.tuiImageEditor.invoke('loadImageFromURL', this.imageUrl, "Image")
    //         console.log('ImageLoad')
    //         if(bla.newHeight !== 0 && bla.newWidth !== 0){
    //             this.local_visible = false
    //         }
    //     }
    // }, 1500);
  },
  computed: {
    dataUrl () {
      if(!this.editor) return ''
      return this.editor.toDataURL()
    },
    editor () {
      return this.$refs.tuiImageEditor.editorInstance
    }
  },
  data() {
    return {
      local_visible:true,
      dialog: true,
      useDefaultUI: true,
      options: {
          usageStatistics: false,
          includeUI: {
            _theme: whiteTheme,
            loadImage: {
              path: this.imageUrl,
              name: 'Image'
            },
            menuBarPosition: 'top',
            locale: locale_ita,
            menu: ['draw', 'crop','rotate','filter','flip'],
            initMenu: 'crop'
          },
          cssMaxWidth: 640,
          cssMaxHeight: 600
      }
    }
  }
}
</script>

<style >
header{
  position: absolute;
}
.tie-btn-deleteAll,
.tie-btn-delete,
.tie-btn-reset,
.tui-image-editor-controls-buttons,
.tui-image-editor-header-logo, _tui-image-editor-submenu, .tui-image-editor-controls-logo {
  display: none !important;
}
.tui-colorpicker-palette-container {
  overflow-x: auto;
}
.tui-colorpicker-palette-button{
  font-size: 8px !important;
  width: 16px;
  height: 16px;
}
.imageEditorApp {
  width: 100%;
  height: 700px;
}

.tui-image-editor-header-buttons {
  float: left !important;
}
.tui-image-editor-header-buttons {
  display: none !important;
}
.tui-image-editor-container .tui-image-editor-help-menu{
background: #151515;
}
</style>