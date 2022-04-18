// Automatically loads and bootstraps files
// in the "./src/components/base" folder.

// Imports
import Vue from "vue";
// import upperFirst from "lodash/upperFirst";
// import camelCase from "lodash/camelCase";
// import VueUploadComponent from "vue-upload-component";
import Vuetify from "vuetify";
// Vue.component("file-upload", VueUploadComponent);
Vue.use(Vuetify);
// import VImageInput from 'vuetify-image-input';
// import VImageInput from 'vuetify-image-input/a-la-carte';
// Vue.component("v-image-input", VImageInput);

// const requireComponent = require.context("@/components/base", true, /\.vue$/);

// for (const file of requireComponent.keys()) {
//   const componentConfig = requireComponent(file);
//   const name = file
//     .replace(/index.js/, "")
//     .replace(/^\.\//, "")
//     .replace(/\.\w+$/, "");
//   const componentName = upperFirst(camelCase(name));

//   Vue.component(
//     `Base${componentName}`,
//     componentConfig.default || componentConfig
//   );
// }
